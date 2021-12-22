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

module.exports = router;