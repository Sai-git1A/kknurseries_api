require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const plantsSchema = new schema({
    id: String,
    img: String,
    name: String,
    price: Number,
    stock: String
});

const IndoorPlants = mongoose.model('IndoorPlants', plantsSchema, 'indoor-plants');

app.get('/', (req, res) => {
    res.send('Server is running on port 3000....');
});

app.get('/indoor-plants', (req, res) => {
    IndoorPlants.find({})
       .then(data => {
        res.send(data);
       }) .catch(err => {
        res.send(err);
       });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
