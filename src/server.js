const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to use path module

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve login.html when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Update the path as necessary
});

// Dummy user data for validation
const users = [
    { username: 'admin', password: 'admin' },
    { username: 'user2', password: 'password2' }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        return res.json({ success: true });
    }
    return res.json({ success: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
