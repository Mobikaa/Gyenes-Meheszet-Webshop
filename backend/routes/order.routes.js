const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getCurrentUser } = require('../utils/utils');

router.get('/:orderId', async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);

    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const result = await pool.query(
      `SELECT id, status, order_date, total
       FROM orders
       WHERE id = $1`,
      [orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to fetch order:', err);
    res.status(500).json({ error: 'Could not fetch order' });
  }
});

router.post('/', async (req, res) => {
  const authUser = getCurrentUser(req);
  const userId = authUser?.userId || null;

  const { email, shipping, billing, items, paymentMethod, shippingMethod } = req.body;

  if (!email || typeof email !== 'string' || !shipping || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  if (paymentMethod !== 'utanvetel') {
    return res.status(400).json({ error: 'Unsupported payment method' });
  }

  if (shippingMethod !== 'standard') {
    return res.status(400).json({ error: 'Unsupported shipping method' });
  }

  const {
    full_name,
    phone_number,
    country,
    postal_code,
    city,
    street,
    house_number,
    floor_door
  } = shipping;

  if (!full_name || !phone_number || !country || !postal_code || !city || !street || !house_number) {
    return res.status(400).json({ error: 'Missing shipping address fields' });
  }

  const sameAsShipping = billing?.same_as_shipping === true;

  if (!sameAsShipping) {
    if (!billing || !billing.country || !billing.postal_code || !billing.city || !billing.street || !billing.house_number) {
      return res.status(400).json({ error: 'Missing billing address fields' });
    }
  }

  const itemTotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity);
    const price = Number(item.unit_price_at_order);
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(price) || price < 0) {
      throw new Error('Invalid item data');
    }
    return sum + quantity * price;
  }, 0);

  const paymentFee = paymentMethod === 'utanvetel' ? 500 : 0;
  const shippingFee = shippingMethod === 'standard' ? 1200 : 0;
  const total = itemTotal + paymentFee + shippingFee;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const orderColumnsResult = await client.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = 'orders'
         AND table_schema = 'public'
         AND column_name IN ('payment_method', 'shipping_method', 'payment_fee', 'shipping_fee')`
    );

    const hasNewOrderColumns = orderColumnsResult.rows.length === 4;
    const orderResult = hasNewOrderColumns
      ? await client.query(
          `INSERT INTO orders (user_id, email, total, payment_method, shipping_method, payment_fee, shipping_fee)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id`,
          [userId, email, total, paymentMethod, shippingMethod, paymentFee, shippingFee]
        )
      : await client.query(
          `INSERT INTO orders (user_id, email, total)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [userId, email, total]
        );

    const orderId = orderResult.rows[0].id;

    await client.query(
      `INSERT INTO order_shipping_address
       (order_id, full_name, phone_number, country, postal_code, city, street, house_number, floor_door)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [orderId, full_name, phone_number, country, postal_code, city, street, house_number, floor_door || null]
    );

    await client.query(
      `INSERT INTO order_billing_address
       (order_id, same_as_shipping, full_name, phone_number, country, postal_code, city, street, house_number, floor_door)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        orderId,
        sameAsShipping,
        sameAsShipping ? null : billing?.full_name || null,
        sameAsShipping ? null : billing?.phone_number || null,
        sameAsShipping ? null : billing?.country,
        sameAsShipping ? null : billing?.postal_code,
        sameAsShipping ? null : billing?.city,
        sameAsShipping ? null : billing?.street,
        sameAsShipping ? null : billing?.house_number,
        sameAsShipping ? null : billing?.floor_door || null
      ]
    );

    const values = [orderId];
    const placeholders = items.map((item, index) => {
      const base = 2 + index * 3;
      values.push(item.product_id, item.quantity, item.unit_price_at_order);
      return `($1, $${base}, $${base + 1}, $${base + 2})`;
    }).join(', ');

    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price_at_order)
       VALUES ${placeholders}`,
      values
    );

    for (const item of items) {
      await client.query(
        `UPDATE products SET quantity = quantity - $1 WHERE id = $2`,
        [item.quantity, item.product_id]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ orderId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Could not save order' });
  } finally {
    client.release();
  }
});

module.exports = router;
