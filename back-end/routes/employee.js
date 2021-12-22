const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    let sql = `
    SELECT eno, ename, gender, age, phone, employee.dno, dname 
    FROM employee, department 
    where employee.dno=department.dno
    order by eno asc
    `;
    db.query(sql, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: err.sqlMessage
            })
        } else {
            res.json({
                status: 200,
                data,
                success: true,
                message: "employee list retrieved successfully"
            })
            console.log(data);
        }

    })
});

router.get('/search', function (req, res) {
    var flt = "^";
    flt = flt.concat(req.query.searchitem);
    // console.log(flt);
    let sql = `
    SELECT eno, ename, gender, age, phone, employee.dno, dname 
    FROM employee, department 
    where (employee.dno REGEXP '${flt}' 
        or ename REGEXP '${flt}' 
        or gender REGEXP '${flt}' 
        or dname REGEXP '${flt}') 
        and employee.dno=department.dno
    order by eno asc
    `;
    db.query(sql, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: err.sqlMessage
            })
        } else {
            res.json({
                status: 200,
                data,
                success: true,
                message: "employee list retrieved successfully"
            })
            console.log(data);
        }

    })
});


router.post('/new', function (req, res) {
    let sql = `insert into employee values (?)`;
    let values = [
        req.body.params.eno,
        req.body.params.ename,
        req.body.params.gender,
        req.body.params.age,
        req.body.params.phone,
        req.body.params.dno,
    ]
    db.query(sql, [values], function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: err.sqlMessage
            })
        } else {
            res.json({
                status: 200,
                success: true,
                message: "new employee added successfully"
            })
        }
    })
});


router.post('/update', function (req, res) {
    let sql = `UPDATE  employee SET ename=?, gender=?,age=?,phone=?, dno=? WHERE eno=?`;
    let values = [
        req.body.params.ename,
        req.body.params.gender,
        req.body.params.age,
        req.body.params.phone,
        req.body.params.dno,
        req.body.params.eno,
    ]
    // console.log(values);
    db.query(sql, values, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: err.sqlMessage
            })
        } else {
            res.json({
                status: 200,
                success: true,
                message: "employee info updated successfully"
            })
        }
    })
});


router.delete('/delete', function (req, res) {
    // console.log(req.query);
    let sql = `delete from employee where eno='${req.query.eno}'`;
    db.query(sql, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: err.sqlMessage
            })
        } else {
            res.json({
                status: 200,
                success: true,
                message: "employee deleted successfully"
            })
        }
    })
});

module.exports = router;