const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

let dbPath;
if (process.env.VERCEL) {
  dbPath = path.join('/tmp', 'darcare.db');
  const sourceDb = path.join(__dirname, '..', 'data', 'darcare.db');
  if (!fs.existsSync(dbPath) && fs.existsSync(sourceDb)) {
    try {
      fs.copyFileSync(sourceDb, dbPath);
    } catch (e) {
      console.warn('Could not copy db to /tmp:', e);
    }
  }
} else {
  const dataDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  dbPath = path.join(dataDir, 'darcare.db');
}

const db = new DatabaseSync(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref_code TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    service TEXT NOT NULL,
    property_type TEXT,
    preferred_date TEXT,
    preferred_slot TEXT,
    notes TEXT,
    status TEXT DEFAULT 'Pending',
    assigned_tech TEXT DEFAULT 'Unassigned',
    estimated_cost TEXT DEFAULT 'To be assessed',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin'
  );
`);

// Seed default admin if not exists
const checkAdmin = db.prepare('SELECT count(*) as count FROM admin_users').get();
if (checkAdmin.count === 0) {
  const insertAdmin = db.prepare('INSERT INTO admin_users (username, password, role) VALUES (?, ?, ?)');
  insertAdmin.run('admin', 'havencare2026', 'superadmin');
}

// Seed initial bookings if table is empty for instant demonstration
const checkBookings = db.prepare('SELECT count(*) as count FROM bookings').get();
if (checkBookings.count === 0) {
  const insertBooking = db.prepare(`
    INSERT INTO bookings (
      ref_code, customer_name, phone, city, service, property_type,
      preferred_date, preferred_slot, notes, status, assigned_tech, estimated_cost,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sampleBookings = [
    [
      'HAV-7102',
      'Sheikh Mansoor Al-Nahyan',
      '+971501234567',
      'Dubai',
      'AC Repair & Maintenance',
      'Villa',
      '2026-10-22',
      'Morning (8 AM – 12 PM)',
      'Master bedroom split AC not cooling efficiently. Filter sanitation required.',
      'Confirmed',
      'Tariq Mahmoud (Lead HVAC Tech)',
      'AED 450',
      new Date(Date.now() - 3600000 * 4).toISOString(),
      new Date().toISOString()
    ],
    [
      'HAV-8291',
      'Elena Rostova',
      '+971559876543',
      'Dubai',
      'Plumbing & Water Systems',
      'Apartment',
      '2026-10-23',
      'Afternoon (12 PM – 4 PM)',
      'Low water pressure in kitchen faucet and bathroom bidet check.',
      'In Progress',
      'Farhan Qureshi',
      'AED 280',
      new Date(Date.now() - 3600000 * 8).toISOString(),
      new Date().toISOString()
    ],
    [
      'HAV-9410',
      'Dr. Omar Al-Qasimi',
      '+971508889911',
      'Sharjah',
      'Electrical & Smart Lighting',
      'Villa',
      '2026-10-24',
      'Urgent / ASAP',
      'Outdoor landscape breaker tripping during garden sprinkler cycle.',
      'Pending',
      'Unassigned',
      'AED 350',
      new Date(Date.now() - 3600000 * 1).toISOString(),
      new Date().toISOString()
    ],
    [
      'HAV-4522',
      'Charlotte Dupont',
      '+971523344556',
      'Abu Dhabi',
      'Villa Painting & Finishing',
      'Villa',
      '2026-10-25',
      'Morning (8 AM – 12 PM)',
      'Full interior touch-up for 4-bedroom villa before lease renewal.',
      'Completed',
      'Rashid Al-Kindi & Crew',
      'AED 2,800',
      new Date(Date.now() - 3600000 * 48).toISOString(),
      new Date().toISOString()
    ]
  ];

  for (const b of sampleBookings) {
    insertBooking.run(...b);
  }
}

module.exports = db;
