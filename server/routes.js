const express = require('express');
const router = express.Router();
const db = require('./db');

// Helper to generate unique reference code: HAV-XXXX
function generateRefCode() {
  const chars = '0123456789';
  let num = '';
  for (let i = 0; i < 4; i++) {
    num += chars[Math.floor(Math.random() * chars.length)];
  }
  return `HAV-${num}`;
}

/* ========================================================
   CUSTOMER ENDPOINTS
======================================================== */

// 1. Create a new booking
router.post('/bookings', (req, res) => {
  try {
    const {
      name,
      phone,
      city,
      service,
      propertyType,
      preferredDate,
      preferredSlot,
      notes
    } = req.body;

    if (!name || !phone || !city || !service) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, emirate, and service are required.'
      });
    }

    let refCode = generateRefCode();
    // Ensure ref code is unique
    const checkRef = db.prepare('SELECT id FROM bookings WHERE ref_code = ?').get(refCode);
    if (checkRef) {
      refCode = generateRefCode() + 'X';
    }

    const now = new Date().toISOString();
    const insert = db.prepare(`
      INSERT INTO bookings (
        ref_code, customer_name, phone, city, service, property_type,
        preferred_date, preferred_slot, notes, status, assigned_tech, estimated_cost,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 'Unassigned', 'To be assessed', ?, ?)
    `);

    const result = insert.run(
      refCode,
      name.trim(),
      phone.trim(),
      city.trim(),
      service.trim(),
      propertyType ? propertyType.trim() : 'Villa',
      preferredDate || 'Flexible',
      preferredSlot || 'Morning (8 AM – 12 PM)',
      notes ? notes.trim() : '',
      now,
      now
    );

    const newBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);

    // Pre-build WhatsApp text
    const waText = encodeURIComponent(
      `Hello HavenCare, I booked a home maintenance visit.\nReference: ${refCode}\nName: ${name}\nService: ${service}\nEmirate: ${city}\nScheduled: ${preferredDate || 'Flexible'} (${preferredSlot || 'Anytime'})\nPlease confirm my slot.`
    );

    return res.status(201).json({
      success: true,
      message: 'Booking request created successfully.',
      booking: newBooking,
      whatsappUrl: `https://wa.me/923107146019?text=${waText}`
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 2. Track booking by Reference Code or Phone
router.get('/bookings/track', (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Please provide a reference code or phone number.' });
    }

    const cleanQuery = query.trim().toUpperCase();
    // Search by ref_code or phone (partial or exact)
    const stmt = db.prepare(`
      SELECT ref_code, customer_name, city, service, property_type,
             preferred_date, preferred_slot, status, assigned_tech, estimated_cost, created_at
      FROM bookings
      WHERE UPPER(ref_code) = ? OR phone LIKE ?
      ORDER BY id DESC
      LIMIT 5
    `);

    const results = stmt.all(cleanQuery, `%${query.trim()}%`);

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No active bookings found matching "${query}". Please check your Reference Code (e.g. HAV-7102) or phone number.`
      });
    }

    return res.json({
      success: true,
      count: results.length,
      bookings: results
    });
  } catch (err) {
    console.error('Error tracking booking:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

/* ========================================================
   ADMIN & MANAGEMENT ENDPOINTS
======================================================== */

// 3. Admin Login
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required.' });
  }

  const user = db.prepare('SELECT id, username, role FROM admin_users WHERE username = ? AND password = ?').get(username, password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }

  return res.json({
    success: true,
    message: 'Authentication successful.',
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// 4. Get Dashboard Statistics
router.get('/stats', (req, res) => {
  try {
    const total = db.prepare('SELECT count(*) as count FROM bookings').get().count;
    const pending = db.prepare("SELECT count(*) as count FROM bookings WHERE status = 'Pending'").get().count;
    const confirmed = db.prepare("SELECT count(*) as count FROM bookings WHERE status = 'Confirmed'").get().count;
    const inProgress = db.prepare("SELECT count(*) as count FROM bookings WHERE status = 'In Progress'").get().count;
    const completed = db.prepare("SELECT count(*) as count FROM bookings WHERE status = 'Completed'").get().count;

    const cityBreakdown = db.prepare(`
      SELECT city, count(*) as count FROM bookings GROUP BY city ORDER BY count DESC
    `).all();

    const serviceBreakdown = db.prepare(`
      SELECT service, count(*) as count FROM bookings GROUP BY service ORDER BY count DESC
    `).all();

    return res.json({
      success: true,
      stats: {
        total,
        pending,
        confirmed,
        inProgress,
        completed,
        cityBreakdown,
        serviceBreakdown
      }
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 5. Get All Bookings (with search & filtering)
router.get('/bookings', (req, res) => {
  try {
    const { status, city, search } = req.query;
    let query = 'SELECT * FROM bookings WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (city && city !== 'all') {
      query += ' AND city = ?';
      params.push(city);
    }

    if (search) {
      query += ' AND (customer_name LIKE ? OR phone LIKE ? OR ref_code LIKE ? OR service LIKE ?)';
      const s = `%${search.trim()}%`;
      params.push(s, s, s, s);
    }

    query += ' ORDER BY id DESC';

    const bookings = db.prepare(query).all(...params);
    return res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 6. Update Booking Status / Technician / Notes
router.patch('/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, assigned_tech, estimated_cost, notes } = req.body;

    const existing = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const newStatus = status || existing.status;
    const newTech = assigned_tech !== undefined ? assigned_tech : existing.assigned_tech;
    const newCost = estimated_cost !== undefined ? estimated_cost : existing.estimated_cost;
    const newNotes = notes !== undefined ? notes : existing.notes;
    const now = new Date().toISOString();

    const update = db.prepare(`
      UPDATE bookings
      SET status = ?, assigned_tech = ?, estimated_cost = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `);

    update.run(newStatus, newTech, newCost, newNotes, now, id);

    const updatedBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
    return res.json({ success: true, message: 'Booking updated.', booking: updatedBooking });
  } catch (err) {
    console.error('Error updating booking:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 7. Delete Booking
router.delete('/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const del = db.prepare('DELETE FROM bookings WHERE id = ?');
    const result = del.run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }
    return res.json({ success: true, message: 'Booking removed successfully.' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 8. CSV Export
router.get('/export/csv', (req, res) => {
  try {
    const bookings = db.prepare('SELECT * FROM bookings ORDER BY id DESC').all();
    const headers = [
      'ID', 'Reference', 'Customer Name', 'Phone', 'Emirate', 'Service',
      'Property', 'Preferred Date', 'Time Slot', 'Status', 'Technician',
      'Estimated Cost', 'Created At'
    ];

    const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;

    const rows = bookings.map(b => [
      b.id,
      escapeCsv(b.ref_code),
      escapeCsv(b.customer_name),
      escapeCsv(b.phone),
      escapeCsv(b.city),
      escapeCsv(b.service),
      escapeCsv(b.property_type),
      escapeCsv(b.preferred_date),
      escapeCsv(b.preferred_slot),
      escapeCsv(b.status),
      escapeCsv(b.assigned_tech),
      escapeCsv(b.estimated_cost),
      escapeCsv(b.created_at)
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="havencare-bookings.csv"');
    return res.send(csvContent);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    return res.status(500).send('Error exporting bookings.');
  }
});

module.exports = router;
