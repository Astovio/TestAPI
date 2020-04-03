const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Handing GET requests for '/file/`
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