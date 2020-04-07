const express = require('express');
const mysql = require('../controllers/mysql.controller');

const con = require('../config/db');
const router = express.Router();

router.get('/', (req, res, next) => {
    con.query('SELECT * FROM test', (err, rows) => {
        res.status(200).json({
            status: "Success",
            data: rows
        });
    });
});

/* Expects a req.body json in the format of:
{
	"tr": "2020-00008",
	"document": "New Document",
	"section": "2.15"
}
*/
router.post('/', (req, res, next) => {
    let test = []
    test.push(req.body.tr ? req.body.tr : null);
    test.push(req.body.document ? req.body.document : null);
    test.push(req.body.section ? req.body.section : null);

    con.query('INSERT INTO test (tr_id, ref_doc, doc_sec) VALUES(?,?,?)', test, (err,rows) => {
        if(err) {
            res.status(500).json({
                status: "Error!",
                message: err.message
            });
        } else {
            let newID = rows.insertId;
            res.status(201).json({
                status: "Success!",
                message: "Added Test",
                testID: newID
            });
        }
    });
});

router.get('/:testID', (req, res, next) => {
    const id = req.params.testID;
    con.query(`SELECT * FROM test WHERE test_id = ${id}`, (err, rows) => {
        if(err){
            res.status(500).json({
                status: "Error!",
                message: err.message
            })
        } else {
            res.status(200).json({
                status: "Success!",
                message: rows
            });
        };
    });
});

/*  Expects a req.body json in the following format:
    Any field other than the "testID" field can be ommitted to retain the old value.
{
    "testID": "123",
	"tr": "2020-00008",
	"document": "New Document",
	"section": "2.15"
}
*/
router.patch('/:testID', mysql.patchTest);

router.delete('/:testID', (req, res, next) => {
    const id = req.params.testID;
    con.query(`DELETE FROM test WHERE test_id = "${id}"`, (err, rows) => {
        if(err){
            res.status(500).json({
                status: "Error!",
                message: err.message
            })
        } else {
            res.status(200).json({
                status: "Success!",
                message: rows
            });
        };
    });
});

module.exports = router;