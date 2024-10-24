const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // For handling file paths
const bcrypt = require('bcrypt'); // For password encryption
const db = require('./db'); // SQLite database connection

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve login.html when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Ensure correct path to your HTML file
});

// Register a new user (Example route for registration)
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error registering user' });
        }
        res.json({ success: true, message: 'User registered successfully' });
    });
});

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database for the user
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error fetching user' });
        }

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
