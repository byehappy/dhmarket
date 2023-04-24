const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Connect to database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'D&H market',
    password: 'qwerty',
    port: '5432',
});
app.post('/user', async (req, res) => {
    try {
        const { name, email, address, phone_number, password } = req.body;

        // Check if the email is already registered
        const userExists = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Add the new user to the database
        const newUser = await pool.query(
            "INSERT INTO customers (name, email, address, phone_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, address, phone_number",
            [name, email, address, phone_number, hashedPassword]
        );

        res.json({
            message: 'New user added successfully',
            user: newUser.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is registered
        const user = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Define routes
app.get('/user', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM customers');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/user', async (req, res) => {
    const { name, email, address, phone_number } = req.body;
    const query = 'INSERT INTO customers(name, email, address, phone_number) VALUES($1, $2, $3, $4) RETURNING id';
    const values = [name, email, address, phone_number];

    try {
        const result = await pool.query(query, values);
        const newUserId = result.rows[0].id;

        res.status(201).json({
            message: 'New user added successfully',
            customers: {
                id: newUserId,
                name,
                email,
                address,
                phone_number,
            },
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({
            message: 'Error adding new user',
        });
    }
});
app.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM customers WHERE id = $1';

    try {
        await pool.query(query, [userId]);

        res.json({
            message: `User with id ${userId} deleted successfully`,
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({
            message: 'Error deleting user',
        });
    }
});
    app.get('/products', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/products/top', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products ORDER BY rating DESC, votes DESC LIMIT 4');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});