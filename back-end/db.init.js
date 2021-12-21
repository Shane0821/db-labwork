const express = require('express');

const createTable = () => {
    var sql = "CREATE TABLE if not exists employee (eno INT PRIMARY KEY, ename VARCHAR(50) NOT NULL, gender VARCHAR(50) NOT NULL, age INT NOT NULL, phone VARCHAR(20) NOT NULL, dno INT NOT NULL)";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Employee Table created");
    });
    var sql = "CREATE TABLE if not exists department (dno INT PRIMARY KEY, dname VARCHAR(50) NOT NULL, address VARCHAR(50) NOT NULL, bossno INT DEFAULT NULL, FOREIGN KEY(bossno) REFERENCES employee(eno))";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Department Table created");
    });
    var sql = "CREATE TABLE if not exists project (pno INT PRIMARY KEY, dsc VARCHAR(200) DEFAULT '还没有添加描述', stime DATE NOT NULL, ftime DATE NOT NULL, leaderno INT NOT NULL, FOREIGN KEY(leaderno) REFERENCES employee(eno))";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Project Table created");
    });
    var sql = "CREATE TABLE if not exists contribution (eno INT NOT NULL, pno INT NOT NULL, ctime DOUBLE DEFAULT 0, PRIMARY KEY(eno, pno), FOREIGN KEY(eno) REFERENCES employee(eno), FOREIGN KEY(pno) REFERENCES project(pno))";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Contribution Table created");
    });
    var sql = "ALTER TABLE employee ADD CONSTRAINT fk_dno FOREIGN KEY(dno) REFERENCES department(dno) ON DELETE CASCADE";
    db.query(sql, function (err, result) {
        // if (err) console.log(err);
    });
    var sql = "insert into department values(205,'人事部', '2楼401室',NULL)";
    db.query(sql, function (err, result) {
        // if (err) console.log(err);
    });
    var sql = "insert into department values(206,'技术部', '1楼111室',NULL)";
    db.query(sql, function (err, result) {
        // if (err) console.log(err);
    });
    var sql = "insert into employee values(1,'张三', '男',30,13291349099,205)";
    db.query(sql, function (err, result) {
        // if (err) console.log(err);
    });
    var sql = "insert into employee values(2,'李四', '男',28,11111111111,206)";
    db.query(sql, function (err, result) {
        // if (err) console.log(err);
    });
    var sql = "insert into employee values(3,'王二', '男',26,18093170888,206)";
    db.query(sql, function (err, result) {
        // if (err) console.log(err);
    });
}

exports.createTable = createTable;