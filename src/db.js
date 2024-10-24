// db.js
const sqlite3 = require('sqlite3').verbose();

// Create a new database or open the existing one
const db = new sqlite3.Database('./user_payment_portal.db', (err) => {
    if (err) {
        console.error("Error opening database: ", err.message);
    } else {
        console.log("Connected to the SQLite database.");
        // Create a Users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )`);
    }
});

module.exports = db;
