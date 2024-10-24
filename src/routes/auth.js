// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // SQLite database connection
const router = express.Router();

const saltRounds = 10;

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the username and hashed password in the database
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error registering user' });
        }
        res.json({ success: true, message: 'User registered successfully!' });
    });
});

// Login an existing user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Retrieve user from the database
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error fetching user' });
        }

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Compare the stored hashed password with the one provided
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid password' });
        }
    });
});

module.exports = router;
