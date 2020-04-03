const express = require('express');
const mysql = require('../controllers/mysql.controller');
const router = express.Router();

// Handle GET request for home page
router.get('/', (req,res) => {
    res.render('main', {title: 'Title Goes Here!!'});
});

// Handle GET request for a '/search' 
router.get('/search', mysql.searchSQL);

module.exports = router;

