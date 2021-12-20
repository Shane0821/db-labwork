const express = require('express'),
    path = require('path'), // add path module,
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'); // import mysql module

// setup database
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test'
})

db.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log("Successfully connected to the database.");
});

var initdb = require('./db.init');
initdb.createTable();

// make server object that contain port property and the value for our server.
var server = {
    port: 3000
};

//routers
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');

// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())  // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }))  // parse requests of content-type - application/x-www-form-urlencoded

//use router
app.use('/users', usersRouter); // 到/users的路由
app.use('/employees', employeesRouter); // 到/users的路由

// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));

app.get('/', function (req, res) {
    console.log("Welcome!");
    res.json({ message: "Welcome to bezkoder application." });
});