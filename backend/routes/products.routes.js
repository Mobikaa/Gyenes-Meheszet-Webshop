const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const after = Number(req.query.after) || 0;

  try {
    const result = await pool.query(
      `SELECT id, name, price, description, picture
       FROM products
       WHERE id > $1
       ORDER BY id
       LIMIT $2`,
      [after, limit]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
