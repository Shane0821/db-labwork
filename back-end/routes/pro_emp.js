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


router.get('/rank', function (req, res) {
    let sql = `
    select T.rank, T.eno, T.cnt, ename
    from (select  count(*) as 'rank', X.eno, X.cnt
          from (select count(*) as cnt, eno from pro_emp group by eno) as X,
               (select count(*) as cnt, eno from pro_emp group by eno) as Y
          where X.cnt < Y.cnt or (X.cnt=Y.cnt and X.eno=Y.eno)
          group by X.eno) as T, employee
    where employee.eno = T.eno
    order by T.cnt desc;
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

module.exports = router;