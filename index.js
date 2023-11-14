require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURL);
mongoose.connection.on('connected', () => {
  console.log('database connected');
});

const plantsSchema = new schema({
    _id: String,
    head: Object,
    body: Object,
});

const Plants = mongoose.model('IndoorPlants', plantsSchema, 'indoor-plants');

app.get('/', (req, res) => {
    res.send('Server is running on port 3000....');
});

app.get('/indoor-plants', (req, res) => {
    Plants.find({}, (err, plants) => {
        if (err) {
            res.send(err);
        } else {
            res.send(plants);
        }
    }); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
