const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

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

module.exports = router;