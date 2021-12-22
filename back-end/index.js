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
    database: 'test',
    timezone: 'SYSTEM'
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

// use the modules
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json())  // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }))  // parse requests of content-type - application/x-www-form-urlencoded

//routers
const usersRouter = require('./routes/users');
const employeeRouter = require('./routes/employee');
const departmentRouter = require('./routes/department');
const projectRouter = require('./routes/project');

//use router
app.use('/users', usersRouter); // 到/users的路由
app.use('/employee', employeeRouter); // 到/employee的路由
app.use('/department', departmentRouter); // 到/department的路由
app.use('/project', projectRouter);

// starting the server
const PORT = 4040;
app.listen(PORT, () => console.log(`Server started, listening port: ${PORT}`));

app.get('/', function (req, res) {
    console.log("Welcome!");
    res.json({ message: "Welcome to application." });
});