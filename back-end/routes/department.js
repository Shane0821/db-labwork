const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    let sql = `SELECT department.dno, dname, address, bossno, ename FROM department LEFT JOIN employee ON department.bossno = employee.eno`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            success: true,
            message: "department list retrieved successfully"
        })
        console.log(data);
    })
});

module.exports = router;