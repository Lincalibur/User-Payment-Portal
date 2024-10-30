const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user database
let users = [
    { username: 'admin', password: 'admin' },
    { username: 'user2', password: 'password2' }
];

// Serve login.html when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user && user.password === password) { // This will later check the hashed password
        return res.json({ success: true });
    }
    return res.json({ success: false });
});

// Handle registration
app.post('/api/register', async (req, res) => {
    const { name, surname, email, password } = req.body;
    
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    users.push({
        name,
        surname,
        email,
        password: hashedPassword
    });

    return res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
