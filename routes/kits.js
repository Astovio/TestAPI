const express = require('express');
const mysql = require('mysql');

const con = require('../config/db');
const router = express.Router();

router.get('/', (req, res, next) => {
    con.query('SELECT * FROM kits', (err, rows) => {
        res.status(200).json({
            status: "Success",
            data: rows
        });
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: `Handing POST requests for '/kits/`
    });
});

router.get('/:kitID', (req, res, next) => {
    const id = req.params.kitID;
    res.status(200).json({
        message: `Handing GET requests for specific kit`,
        id: id
    });
});

router.patch('/:kitID', (req, res, next) => {
    const id = req.params.kitID;
    res.status(200).json({
        message: `Handing PATCH requests for specific kit`,
        id: id
    });
});

router.delete('/:kitID', (req, res, next) => {
    const id = req.params.kitID;
    res.status(200).json({
        message: `Handing GET requests for specific kit`,
        id: id
    });
});

module.exports = router;