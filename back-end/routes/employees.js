const express = require('express'),
    router = express.Router();

// get user lists
router.get('/', function (req, res) {
    let sql = `SELECT * FROM employees`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "employees lists retrieved successfully"
        })
        console.log(data);
    })
});

module.exports = router;