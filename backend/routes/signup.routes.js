const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const { getCurrentUser } = require('../utils/utils');

const SALT_ROUNDS = 10;

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email és jelszó megadása kötelező' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Jelszó túl rövid' });
        }

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Létezik ilyen felhasználó' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await pool.query(
            `INSERT INTO users 
            (email, password_hash)
            VALUES
            ($1, $2)
            RETURNING id, email`,
            [email, passwordHash]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get user profile (requires auth)
router.get('/:id', async (req, res) => {
    try {
        const authUser = getCurrentUser(req);
        const userId = Number(req.params.id);

        if (!authUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (authUser.userId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const result = await pool.query(
            `SELECT u.id, u.email,
                    a.full_name, a.phone_number, a.country, a.postal_code,
                    a.city, a.street, a.house_number, a.floor_door
             FROM users u
             LEFT JOIN user_shipping_address a ON a.user_id = u.id
             WHERE u.id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const row = result.rows[0];

        res.json({
            id: row.id,
            email: row.email,
            address: {
                full_name: row.full_name,
                phone_number: row.phone_number,
                country: row.country,
                postal_code: row.postal_code,
                city: row.city,
                street: row.street,
                house_number: row.house_number,
                floor_door: row.floor_door,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update user address (requires auth)
router.put('/:id', async (req, res) => {
    try {
        const authUser = getCurrentUser(req);
        const userId = Number(req.params.id);

        if (!authUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (authUser.userId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const address = req.body.address;

        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }

        const {
            full_name,
            phone_number,
            country,
            postal_code,
            city,
            street,
            house_number,
            floor_door,
        } = address;

        await pool.query(
            `INSERT INTO user_shipping_address
             (user_id, full_name, phone_number, country, postal_code, city, street, house_number, floor_door)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             ON CONFLICT (user_id) DO UPDATE SET
               full_name = EXCLUDED.full_name,
               phone_number = EXCLUDED.phone_number,
               country = EXCLUDED.country,
               postal_code = EXCLUDED.postal_code,
               city = EXCLUDED.city,
               street = EXCLUDED.street,
               house_number = EXCLUDED.house_number,
               floor_door = EXCLUDED.floor_door
            `,
            [
                userId,
                full_name || null,
                phone_number || null,
                country || null,
                postal_code || null,
                city || null,
                street || null,
                house_number || null,
                floor_door || null,
            ]
        );

        const result = await pool.query(
            `SELECT u.id, u.email,
                    a.full_name, a.phone_number, a.country, a.postal_code,
                    a.city, a.street, a.house_number, a.floor_door
             FROM users u
             LEFT JOIN user_shipping_address a ON a.user_id = u.id
             WHERE u.id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const row = result.rows[0];

        res.json({
            id: row.id,
            email: row.email,
            address: {
                full_name: row.full_name,
                phone_number: row.phone_number,
                country: row.country,
                postal_code: row.postal_code,
                city: row.city,
                street: row.street,
                house_number: row.house_number,
                floor_door: row.floor_door,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;