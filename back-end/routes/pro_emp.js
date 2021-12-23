const { format } = require('mysql');

const express = require('express'),
    router = express.Router();

router.post('/new', function (req, res) {
    let sql = `insert into pro_emp values(?,?)`;
    let values = [
        req.body.params.pno,
        req.body.params.eno,
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
                message: "new record added successfully"
            })
        }
    })
});

router.delete('/delete', function (req, res) {
    let sql = `
    delete from pro_emp 
    where pno = '${req.query.pno}'
    and eno = '${req.query.eno}'
    `;
    console.log(req.query);
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
                message: "record deleted successfully"
            })
        }
    })
});

module.exports = router;