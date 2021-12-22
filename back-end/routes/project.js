const { format } = require('mysql');

const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    let sql = `
    SELECT pno, dsc, stime, ftime, leaderno, ename 
    FROM project LEFT JOIN employee ON project.leaderno = employee.eno
    order by pno asc
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
            console.log(data);
            res.json({
                status: 200,
                data,
                success: true,
                message: "project list retrieved successfully"
            })

        }
    })
});

router.get('/search', function (req, res) {
    var flt = "^";
    flt = flt.concat(req.query.searchitem);
    // console.log(flt);
    let sql = `
    SELECT department.dno, dname, address, bossno, ename 
    FROM department LEFT JOIN employee ON department.bossno = employee.eno
    where (department.dno REGEXP '${flt}' 
        or dname REGEXP '${flt}' 
        or address REGEXP '${flt}' 
        or ename REGEXP '${flt}') 
    order by dno asc
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
                message: "department list retrieved successfully"
            })
            console.log(data);
        }

    })
});


router.post('/new', function (req, res) {
    let sql = `insert into department values(?,?,?,?)`;
    let values = [
        req.body.params.dno,
        req.body.params.dname,
        req.body.params.address,
        req.body.params.bossno === '' ? null : req.body.params.bossno,
    ]
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
                message: "new department added successfully"
            })
        }
    })
});


router.post('/update', function (req, res) {
    let sql = `
    UPDATE department 
    SET dname=?, address=?, bossno=? WHERE dno=?
    `;
    let values = [
        req.body.params.dname,
        req.body.params.address,
        req.body.params.bossno === '' ? null : req.body.params.bossno,
        req.body.params.dno,
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
    console.log(req.query);
    let sql = `delete from department where dno='${req.query.dno}'`;
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