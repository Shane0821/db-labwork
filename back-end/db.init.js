const express = require('express');

const createTable = () => {
    var sql = "CREATE TABLE if not exists employees (eno INT AUTO_INCREMENT PRIMARY KEY, ename VARCHAR(255), gender VARCHAR(25), age INT(3), dno INT)";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Employees Table created");
    });
}

exports.createTable = createTable;