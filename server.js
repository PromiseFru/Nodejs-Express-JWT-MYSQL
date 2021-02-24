require("dotenv").config();
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
const Role = db.role;

db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
};

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