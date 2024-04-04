const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017/dashmongodb://localhost:27017/board'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', async (req, res) => {
    const formData = req.body;

    try {
        const db = client.db('dashboard'); // Replace with your database name
        const collection = db.collection('person'); // Replace with your collection name
        await collection.insertOne(formData);
        console.log('Form data inserted into MongoDB:', formData);
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error inserting form data into MongoDB:', error);
        res.status(500).send('Error submitting form');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sign_up.html'); // Serve your HTML file
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
