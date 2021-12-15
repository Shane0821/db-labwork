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
    database: 'labworkdb'
})

db.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
});

// make server object that contain port property and the value for our server.
var server = {
    port: 3000
};

//routers
const usersRouter = require('./routes/users');
// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // parsing incoming requests with urlencoded based body-parser

//use router
app.use('/users', usersRouter); // 到/users的路由

// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '') + '/input.html');
});