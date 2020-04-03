const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Handing GET requests for '/tests/`
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: `Handing POST requests for '/tests/`
    });
});

router.get('/:testID', (req, res, next) => {
    const id = req.params.testID;
    res.status(200).json({
        message: `Handing GET requests for specific test`,
        id: id
    });
});

router.patch('/:testID', (req, res, next) => {
    const id = req.params.testID;
    res.status(200).json({
        message: `Handing PATCH requests for specific test`,
        id: id
    });
});

router.delete('/:testID', (req, res, next) => {
    const id = req.params.testID;
    res.status(200).json({
        message: `Handing GET requests for specific test`,
        id: id
    });
});

module.exports = router;