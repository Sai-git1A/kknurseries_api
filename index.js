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

const plantsSchema = new schema({
    id: String,
    img: String,
    name: String,
    price: Number,
    stock: String
});

const ordersSchema = new schema({
    _id: String,
    name: String,
    email: String,
    phone: Number,
    amount: Number,
    address: String,
    order_id: String,
    pay_status: String,
    pay_type: String,
    date: String,
    cartData: Array
});

const IndoorPlants = mongoose.model('IndoorPlants', plantsSchema, 'indoor-plants');
const Payments = mongoose.model('Payments', ordersSchema, 'payments');

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

app.get('/orders/:phone', (req, res) => {
    Payments.find({phone: req.params.phone})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/admin-orders', (req, res) => {
    Payments.find({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });    
});

app.get('/weather-location', (req, res) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apikey = process.env.WEATHER_API_KEY;
        const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}=${lat},${lon}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.log(error);
            });        
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
