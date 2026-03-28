const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const after = Number(req.query.after) || 0;

  try {
    const result = await pool.query(
      `SELECT id, name, quantity, price, weight, description, picture
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

router.get('/featured', async (req, res) => {
  try {
    const ids = (req.query.ids || '')
      .split(',')
      .map(Number)
      .filter(n => !isNaN(n));

    const result = await pool.query(
      `SELECT id, name, quantity, price, weight, description, picture
     FROM products
     WHERE id = ANY($1::int[])`,
      [ids]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/rows', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(id)
     FROM products`
    );

    const rows = Number(result.rows[0].count);

    res.json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }


    const result = await pool.query(
      `SELECT id, name, quantity, price, weight, description, picture
     FROM products
     WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
