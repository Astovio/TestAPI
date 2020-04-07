const express = require('express');
const mysql = require('mysql');

const con = require('../config/db');
const router = express.Router();

// Get all kit/model associations
router.get('/', (req, res, next) => {
    con.query('SELECT * FROM kits', (err, rows) => {
        res.status(200).json({
            status: "Success",
            data: rows
        });
    });
});

// Add new kit/model association
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: `Handing POST requests for '/kits/`
    });
});

// Find all model numbers in the given kit
router.get('/?kitID', (req, res, next) => {
    const id = req.params.kitID;
    res.status(200).json({
        message: `Handing GET requests for specific kit`,
        id: id
    });
});

// Find all kits containing the given model #
router.get('/?model', (req, res, next) => {
    const id = req.params.model;
    res.status(200).json({
        message: `Handing GET requests for specific kit`,
        id: id
    });
});

// Remove a kit/model association
router.delete('/:kitID', (req, res, next) => {
    const id = req.params.kitID;
    res.status(200).json({
        message: `Handing GET requests for specific kit`,
        id: id
    });
});

module.exports = router;