const express = require('express');
const app = express();
const port = 5222;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Example payment endpoint
app.post('/api/payments', (req, res) => {
    const { amount } = req.body;

    // Here you can implement your payment processing logic
    // For demonstration, we just return a success message
    res.json({ message: `Payment of ${amount} received successfully!` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
