const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Handing GET requests for '/kits/`
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