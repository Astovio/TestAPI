const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const mainRouter = require('./routes/router');
const testsRouter = require('./routes/tests');
const kitsRouter = require('./routes/kits');
const toolsRouter = require('./routes/tools');
const filesRouter = require('./routes/files');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');     // Allows anybody to request from this API
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET')
        res.status(200).json({});
    };
    next();
});

// Use routes 
app.use('/', mainRouter);
app.use('/tests', testsRouter);
app.use('/kits', kitsRouter);
app.use('/tools', toolsRouter);
app.use('/files', filesRouter);

// Catch any requests not handled by above routes.
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Handle all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    });
});

// Initiate Port variable
var PORT = process.env.PORT || 3000;        // Process.env.PORT will be used when the server
                                            // is actually live (not localhost)
// Listen on PORT for requests
app.listen(PORT, (err) => {
    if(err) {
        console.log('Error initializing server!');
    } else {
        console.log(`Congratulations!! Server running on port ${PORT}!`);
    }
});

