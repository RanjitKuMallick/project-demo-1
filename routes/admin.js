// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../models/db'); // make sure this exists

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.json({ success: true, admin: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
