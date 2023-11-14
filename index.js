require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running on port 3000....');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
