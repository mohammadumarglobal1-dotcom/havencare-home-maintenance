# HavenCare — Full-Stack Home Maintenance & Concierge Platform

A complete, production-ready Full-Stack website and booking platform built with **Vanilla HTML/CSS/JS**, **Node.js (Express 5)**, and an embedded **SQLite (`node:sqlite`)** database.

---

## 🌟 Full-Stack Features

### 1. Customer Portal (`/`)
- **Luxury UAE Design**: Emerald green (`#0E2927`), warm bronze brown (`#844C1D` / `#CF8942`), cream background, with `Marcellus` serif and `Amiri` Arabic bilingual typography (`HavenCare` / `ملاذ كير`).
- **Service Catalog**: Detailed cards for AC Maintenance, Plumbing, Electrical, Painting, and Pest Defense.
- **Care Plans**: Silver, Gold Villa, and Royal Palace annual memberships.
- **Interactive Booking Wizard**:
  - Direct asynchronous submission (`POST /api/bookings`) saving bookings straight into SQLite.
  - Automated generation of a unique reference number (`HAV-XXXX`).
  - Booking confirmation receipt modal with WhatsApp pre-filled direct link.
- **Track Booking Feature**:
  - Accessible `<dialog id="trackModal" closedby="any">` modal accessible from the navbar.
  - Search by Reference Code (e.g. `HAV-7102`) or registered phone number.
  - Live status tracking (Pending 🟡, Confirmed 🔵, In Progress 🟣, Completed 🟢).

### 2. Concierge Admin Dashboard (`/admin`)
- **KPI Metrics**: Real-time counter cards for Total Requests, Pending, Active/Scheduled, and Completed visits.
- **Live Search & Multi-Filters**: Instant client-side & server-side filtering by name, phone, reference, service, status, or emirate.
- **Interactive Table & Actions**:
  - Live status selector: Change status directly in table with automatic background API patch (`PATCH /api/bookings/:id`).
  - Edit & Notes Modal: Update technician assignment (`assigned_tech`), estimated quotes (`estimated_cost`), and service notes.
  - Quick WhatsApp & Phone action buttons for 1-click customer communication.
  - Export CSV button (`GET /api/export/csv`) to download all bookings as a spreadsheet.
  - Auto-refreshes every 30 seconds.

### 3. Backend & REST API (`/api`)
- `POST /api/bookings`: Create and validate new booking requests.
- `GET /api/bookings/track?query=...`: Customer status tracking.
- `GET /api/bookings`: Fetch all bookings with filtering and search.
- `PATCH /api/bookings/:id`: Update booking status, assigned technician, cost, and notes.
- `DELETE /api/bookings/:id`: Delete a booking.
- `GET /api/stats`: Aggregate dashboard stats and emirate breakdown.
- `GET /api/export/csv`: Export all records as a CSV file.
- `POST /api/admin/login`: Admin credentials check.

---

## 📁 Project Directory Structure

```text
darcare-home-maintenance/
├── data/
│   └── darcare.db              # SQLite Database
├── server/
│   ├── db.js                   # node:sqlite connection, schema & sample seeds
│   └── routes.js               # REST API endpoints
├── assets/
│   ├── css/
│   │   ├── style.css           # Customer portal stylesheet (refined luxury brown theme)
│   │   └── admin.css           # Admin dashboard stylesheet
│   ├── js/
│   │   ├── main.js             # Booking submission, tracking & modals
│   │   └── admin.js            # Admin portal interactions & auto-refresh
│   └── images/                 # Optimized WebP imagery
│       ├── hero-bg.webp
│       ├── service-ac.webp
│       ├── service-plumbing.webp
│       ├── service-electrical.webp
│       ├── service-painting.webp
│       ├── service-pest.webp
│       └── our-standard.webp
├── index.html                  # Customer Landing Page & Booking Wizard
├── admin.html                  # Concierge Admin Portal
├── server.js                   # Express application entrypoint
├── package.json
└── README.md
```

---

## 🚀 Running the Project

Start the server:

```powershell
npm start
```

Then visit:
- **Customer Website**: [http://localhost:3000/](http://localhost:3000/)
- **Admin Management Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **API Health & Stats**: [http://localhost:3000/api/stats](http://localhost:3000/api/stats)
