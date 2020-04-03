const express = require('express');
const mysql = require('../controllers/mysql.controller');

const con = require('../config/db');
const router = express.Router();

router.get('/', (req, res, next) => {
    con.query('SELECT * FROM tools', (err, rows) => {
        res.status(200).json({
            status: "Success",
            data: rows
        });
    });
});

router.post('/', (req, res, next) => {
    let tool = []
    tool.push(req.body.model ? req.body.model : null);
    tool.push(req.body.desc ? req.body.desc : null);
    tool.push(req.body.brand ? req.body.brand : null);
    tool.push(req.body.type ? req.body.type : null);

    con.query('INSERT INTO tools VALUES(?,?,?,?)', tool, (err,rows) => {
        if(err) {
            res.status(500).json({
                status: "Error!",
                message: err.message
            });
        } else {
            res.status(201).json({
                status: "Success!",
                message: "Added Tool: " + tool
            });
        }
    });
});

router.get('/:modelID', (req, res, next) => {
    const id = req.body.model;
    con.query('SELECT * FROM tools WHERE model_id = ?', id, (err, rows) => {
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

router.patch('/:modelID', mysql.patchTool);

router.delete('/:modelID', (req, res, next) => {
    const id = req.params.modelID;
    con.query(`DELETE FROM tools WHERE model_id = "${id}"`, (err, rows) => {
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