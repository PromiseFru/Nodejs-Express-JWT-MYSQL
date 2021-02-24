const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const PORT = process.env.PORT || 3000;

// initialize express
var app = express();

// initialize cors
var corsOption = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOption));

// initialze bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// db
db.sync;

// routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome, it's working"
    });
})

// set port, listen for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})