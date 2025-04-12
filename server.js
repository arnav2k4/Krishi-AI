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
app.post('/signup', (req, res) => {
    const { name, number, password } = req.body;

    // Check if all fields are provided
    if (!name || !number || !password) {
        return res.status(400).send('Please provide all fields');
    }

    // Check if the mobile number already registered
    db.query('SELECT * FROM userdata WHERE MobileNumber = ?', [name], (err, results) => {
        console.log('Checking for existing Mobile Number:', name);

        if (err) throw err;
        console.log('Results of MobileNumber check:', results);
        if (results.length > 0) {
            return res.status(400).send('Mobile Number already registered');
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;

            // Insert the new user into the database
            const sql = 'INSERT INTO userdata (name, number, password) VALUES (?, ?, ?)';
            db.query(sql, [name, number, hashedPassword], (err, result) => {
                if (err) throw err;
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

app.post('/login', (req, res) => {
    db.query('SELECT COUNT(*) AS count FROM userdata', (err, results) => {
        if (err) throw err;
        if (results[0].count === 0) {
            return res.status(400).send('No users registered. Please sign up first.');
        }

        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).send('Please provide both name and password');
        }

        db.query('SELECT * FROM userdata WHERE name = ?', [name], (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                return res.status(400).send('Invalid name or password');
            }

            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) {
                    return res.status(400).send('Invalid name or password');
                }
                
                res.json({
                    message: 'Login successful',
                    name: user.name,
                    number: user.number
                });
            });
        });
    });
});


// Clear Users Route
app.delete('/clear-users', (req, res) => {
    db.query('DELETE FROM userdata', (err, result) => {
        console.log('User data cleared, result:', result);

        if (err) {
            return res.status(500).json({ message: 'Error clearing user data' });
        }
        res.status(200).json({ message: 'User data cleared successfully' });
    });
});

app.post('/user-finance', (req, res) => {
    const { fixed_income, variable_income, fixed_expenses, variable_expenses, miscellaneous_expenses, risk_appetite } = req.body;

    if (!fixed_income || !variable_income || !fixed_expenses || !variable_expenses || !miscellaneous_expenses || !risk_appetite) {
        return res.status(400).send('Please provide all fields');
    }

    const sql = 'INSERT INTO user_finance (fixed_income, variable_income, fixed_expenses, variable_expenses, miscellaneous_expenses, risk_appetite) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [fixed_income, variable_income, fixed_expenses, variable_expenses, miscellaneous_expenses, risk_appetite], (err, result) => {
        if (err) return res.status(500).send('Database error');
        res.status(201).json({ message: 'Financial data saved successfully' });
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
