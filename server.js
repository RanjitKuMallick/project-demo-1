// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.redirect("/login.html");
});
