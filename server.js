const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost',     // Your MySQL host (usually localhost)
    user: 'root',          // Your MySQL username
    password: 'user',      // Your MySQL password (leave empty if you didn't set one)
    database: 'krishiAI',   // The database we created earlier
    port: 3306              // MySQL port
});

const createUserDataTable = `
CREATE TABLE IF NOT EXISTS userdata (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    MobileNumber VARCHAR(15),
    Password VARCHAR(255) NOT NULL
);
`;

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    // Create the userdata table first
    db.query(createUserDataTable, (err) => {
        if (err) throw err;
        console.log('userdata table created or already exists');
    });
});

// Signup Route
// Fix the signup route
app.post('/signup', (req, res) => {
    const { name, number, password } = req.body;

    if (!name || !number || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    // Check if the name or number already exists
    db.query('SELECT * FROM userdata WHERE MobileNumber = ?', [number], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Mobile Number already registered' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Insert the new user
            const sql = 'INSERT INTO userdata (Name, MobileNumber, Password) VALUES (?, ?, ?)';
            db.query(sql, [name, number, hashedPassword], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// Fix the login route
app.post('/login', (req, res) => {
    const { number, password } = req.body;

    if (!number || !password) {
        return res.status(400).json({ error: 'Please provide both name and password' });
    }

    db.query('SELECT * FROM userdata WHERE MobileNumber = ?', [number], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid number or password' });
        }

        const user = results[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Server error' });
            }
            
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid number or password' });
            }
            
            res.json({
                message: 'Login successful',
                name: user.name,
                number: user.MobileNumber
            });
        });
    });
});

app.get('/get-name', (req, res) => {
    const userId = req.query.user_id; // Get user ID from query parameters

    const sql = 'SELECT name FROM userdata WHERE id = ? LIMIT 1';
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.length === 0) return res.status(404).json({ error: 'No user found' });

        res.json({ name: result[0].name });
    });
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
