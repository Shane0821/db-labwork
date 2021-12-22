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
    var flt2 = "+";
    flt2 = req.query.searchitem + flt2;
    // console.log(flt2);
    var sql = `
    SELECT pno, dsc, stime, ftime, leaderno, ename
    FROM project LEFT JOIN employee ON project.leaderno = employee.eno
    where(pno REGEXP '${flt}' 
        or stime REGEXP '${flt2}'
        or ftime REGEXP '${flt2}'
        or ename REGEXP '${flt}')
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
            res.json({
                status: 200,
                data,
                success: true,
                message: "project list retrieved successfully"
            })
            //console.log(data);
        }

    })
});


router.post('/new', function (req, res) {
    let sql = `insert into project values(?,?,?,?,NULL)`;
    let values = [
        req.body.params.pno,
        req.body.params.dsc,
        req.body.params.stime,
        req.body.params.ftime
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
                message: "new project added successfully"
            })
        }
    })
});


router.post('/update', function (req, res) {
    let sql = `
    UPDATE project
    SET dsc =?, stime =?, ftime =?, leaderno=? WHERE pno=?
    `;
    let values = [
        req.body.params.dsc,
        req.body.params.stime,
        req.body.params.ftime,
        req.body.params.leaderno,
        req.body.params.pno,
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
                message: "project info updated successfully"
            })
        }
    })
});


router.delete('/delete', function (req, res) {
    let sql = `delete from project where pno = '${req.query.pno}'`;
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
                message: "project deleted successfully"
            })
        }
    })
});


module.exports = router;