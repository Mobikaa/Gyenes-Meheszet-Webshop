const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getCurrentUser } = require('../utils/utils');

router.get('/orders', async (req, res) => {
  try {
    const authUser = getCurrentUser(req);
    if (!authUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT o.id AS order_id,
              o.status,
              o.order_date,
              o.total,
              oi.product_id,
              oi.quantity,
              oi.unit_price_at_order,
              p.name AS product_name
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE o.user_id = $1
       ORDER BY o.order_date DESC, o.id, oi.product_id`,
      [authUser.userId]
    );

    const ordersById = result.rows.reduce((acc, row) => {
      if (!acc[row.order_id]) {
        acc[row.order_id] = {
          id: row.order_id,
          status: row.status,
          order_date: row.order_date,
          total: row.total,
          items: []
        };
      }

      acc[row.order_id].items.push({
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        unit_price_at_order: row.unit_price_at_order
      });

      return acc;
    }, {});

    res.json(Object.values(ordersById));
  } catch (err) {
    console.error('Failed to fetch profile orders:', err);
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

module.exports = router;
