const express = require('express');
const date_format = require( 'dateformat' );
const mysql = require('../controllers/mysql.controller');

const con = require('../config/db');
const router = express.Router();

router.get('/', (req, res, next) => {
    con.query('SELECT * FROM files', (err, rows) => {
        res.status(200).json({
            status: "Success",
            data: rows
        });
    });
});


/* Expects a req.body json in the format of:
{
	"testID": "123",
    "technician": "Holmes",
    "model": "P123",
	"meta_data": "meta data goes here",
	"file_path": "server/filename"
}
*/

router.post('/', (req, res, next) => {
    let file = []
    file.push(req.body.testID ? req.body.testID : null);
    file.push(date_format(new Date(), "yyyy-mm-dd HH:MM:ss"));
    file.push(req.body.technician ? req.body.technician : null);
    file.push(req.body.model ? req.body.model : null);
    file.push(req.body.meta_data ? req.body.meta_data : null);
    file.push(req.body.path ? req.body.path : null);

    con.query('INSERT INTO files (test_id, date_added, technician, model_id, meta_data, file_path) VALUES(?,?,?,?,?,?)', file, (err,rows) => {
        if(err) {
            res.status(500).json({
                status: "Error!",
                message: err.message
            });
        } else {
            let newID = rows.insertId;
            res.status(201).json({
                status: "Success!",
                message: "Added file to test " + req.body.testID,
                fileID: newID
            });
        }
    });
});

router.get('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    con.query(`SELECT * FROM files WHERE file_id = ${id}`, (err, rows) => {
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
    Any field other than the "fileID" field can be ommitted to retain the old value.
{
	"fileID": "234",
	"testID": "123",
    "technician": "Holmes",
    "model": "P123",
	"meta_data": "meta data goes here",
	"file_path": "server/filename"
}
*/
router.patch('/:fileID', mysql.patchFile);

router.delete('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    con.query(`DELETE FROM files WHERE file_id = "${id}"`, (err, rows) => {
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