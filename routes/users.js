// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(409).json({ message: "User already exists" });

    await db.query("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, password]);
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    if (user.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
