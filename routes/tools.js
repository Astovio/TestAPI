const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Handing GET requests for '/tools/`
    });
});

router.post('/', (req, res, next) => {
    const tool = {
        model: req.body.model,
        description: req.body.description,
        brand: req.body.brand,
        toolType: req.body.type
    }
    res.status(201).json({
        message: `Handing POST requests for '/tools/`,
        createdTool: tool
    });
});

router.get('/:modelID', (req, res, next) => {
    const id = req.params.modelID;
    res.status(200).json({
        message: `Handing GET requests for specific model`,
        id: id
    });
});

router.patch('/:modelID', (req, res, next) => {
    const id = req.params.modelID;
    res.status(200).json({
        message: `Handing PATCH requests for specific model`,
        id: id
    });
});

router.delete('/:modelID', (req, res, next) => {
    const id = req.params.modelID;
    res.status(200).json({
        message: `Handing GET requests for specific model`,
        id: id
    });
});

module.exports = router;