const express = require('express');
const mysql = require('mysql');

const con = require('../config/db');
const router = express.Router();

router.get('/', (req, res, next) => {
    con.query('SELECT * FROM datastore', (err, rows) => {
        res.status(200).json({
            status: "Success",
            data: rows
        });
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: `Handing POST requests for '/file/`
    });
});

router.get('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    res.status(200).json({
        message: `Handing GET requests for specific file`,
        id: id
    });
});

router.patch('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    res.status(200).json({
        message: `Handing PATCH requests for specific file`,
        id: id
    });
});

router.delete('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    res.status(200).json({
        message: `Handing GET requests for specific file`,
        id: id
    });
});

module.exports = router;