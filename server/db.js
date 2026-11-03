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

  CREATE TABLE IF NOT EXISTS deleted_booking_refs (
    ref_code TEXT PRIMARY KEY,
    deleted_at TEXT NOT NULL
  );
`);

// Seed default admin if not exists or update password
const checkAdmin = db.prepare('SELECT count(*) as count FROM admin_users').get();
if (checkAdmin.count === 0) {
  const insertAdmin = db.prepare('INSERT INTO admin_users (username, password, role) VALUES (?, ?, ?)');
  insertAdmin.run('admin', 'havencare2026', 'superadmin');
} else {
  db.prepare("UPDATE admin_users SET password = 'havencare2026' WHERE username = 'admin'").run();
}

module.exports = db;
