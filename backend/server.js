// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Basic filter endpoint
app.get('/contacts', async (req, res) => {
  const { search = '' } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM contacts
       WHERE first_name ILIKE $1
          OR last_name ILIKE $1
          OR email ILIKE $1
          OR phone ILIKE $1
          OR job_title ILIKE $1`,
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
