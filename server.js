const express = require('express');
const path = require('path');
const apiRoutes = require('./server/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Admin route
app.get('/admin', (req, res) => {
  res.redirect('/admin.html');
});

// Serve static frontend files
app.use(express.static(__dirname));

// Fallback to index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start Server if run directly
if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`===============================================`);
    console.log(` HavenCare Full-Stack System Running Live!`);
    console.log(` Customer Portal: http://localhost:${PORT}/`);
    console.log(` Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(` REST API:        http://localhost:${PORT}/api/bookings`);
    console.log(`===============================================`);
  });
}

module.exports = app;
