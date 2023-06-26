require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// GET 
app.get('/data', async (req, res) => {
    try {
        const query = 'SELECT * FROM students';

        const result = await db.query(query);

        // Send the fetched data as a JSON response
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred');
    }
});

// POST route to insert new data
app.post('/data', async (req, res) => {
    try {
        // Extract data
        const { name, height, grade, age, class_id } = req.body;

        // Convert to SQL query
        const query = 'INSERT INTO students (name, height, grade, age, class_id) VALUES ($1, $2, $3, $4, $5) returning *';
        const values = [name, height, grade, age, class_id];

        // Execute query
        const results = await db.query(query, values);

        // Post request to express
        res.status(201).json({status: "success", data: results.rows[0]});

    } catch (error) {

        console.error('Error inserting data:', error);
        res.status(500).send('An error occurred');
    }
});



// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
