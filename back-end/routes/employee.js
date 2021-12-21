const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    let sql = `
    SELECT eno, ename, gender, age, employee.dno, dname 
    FROM employee, department 
    where employee.dno=department.dno`;
    db.query(sql, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: "falied to retrieve employee list "
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
    SELECT eno, ename, gender, age, employee.dno, dname 
    FROM employee, department 
    where (eno REGEXP '${flt}' 
        or ename REGEXP '${flt}' 
        or gender REGEXP '${flt}' 
        or dname REGEXP '${flt}') 
        and employee.dno=department.dno
    `;
    db.query(sql, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                success: false,
                message: "falied to retrieve employee list"
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

module.exports = router;