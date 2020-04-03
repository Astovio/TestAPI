/*
// Import mysql library
const mysql = require('mysql');

// Create connection to mysql database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testdata',
}); 
*/

// Export all the following functions:

const con = require('../config/db');

module.exports = {

    // @desc    Searches for tests based on tr# and/or tool brand/model/type
    //          Parses query from URL (url must be in the form '/search?brand=brandname&type=tooltype&tr=tr#')
    //          Any query can be omitted (Ex: '/search?brand=RYOBI' will fetch all tests with RYOBI tools)
    //          This function then puts those query values into a SQL CALL function
    //          Results are sent to the browser
    // @routes  /search?
    // @access  Public
    searchSQL: function(req,res,next){
        let params = [];
        // Get search parameters from url. 
        // If a particular parameter doesn't exist, pass null value.
        params.push(req.body.brand ? req.body.brand : null);
        params.push(req.body.type ? req.body.type : null);
        params.push(req.body.tr ? req.body.tr : null);
        params.push(req.body.model ? req.body.model : null);
        const q = "CALL searchSQL(?,?,?,?);";        // Build query string with placeholders
        con.query(q, params, (err,rows) => {         // Call con.query(queryString, parameter Values, callback)
            res.status(200).json({
                status: "Success",
                data: rows
            });                          // Send results to browser
        });
        //next(); // Go to next middleware function.
    },


    // This function is not ready. parameters for this won't be passed through
    // a URL query. I have to figure out where this info is coming from.
    // This will be used as a middleware function to get testIDs for the addFile query.
    getTestID: function(req,res,next){
        let params = [];
        params.push(req.body.tr ? req.body.tr : null);
        params.push(req.body.doc ? req.body.doc : null);
        params.push(req.body.sec ? req.body.sec : null);
        const q = "CALL getTestID(?,?,?);";
        con.query(q,params, (err, result) => {
            console.log(result);
        });
        next();
    },


    // @desc    Parses request data and adds data to the test table in the database
    // @routes  POST /addtest
    // @access  Public
    addTest: function(req,res,next){
        let params = [];
        params.push(req.body.tr);
        params.push(req.body.doc);
        params.push(req.body.sec);
        const q = "CALL addTest(?,?,?);";
        con.query(q, params, (err, response) => {
            if(err) {
                res.render('addtest', {postStatus: `The following error occured: ${err.sqlMessage}`})
                console.log(err.sqlMessage);
            } else {
                res.render('addtest', {postStatus: 'Success!'})
                console.log(response);
            };
        });
    },

    patchTool: function(req,res,next){
        let params = [];
        params.push(req.params.modelID);
        params.push(req.body.desc ? req.body.desc : null);
        params.push(req.body.brand ? req.body.brand : null);
        params.push(req.body.type ? req.body.type : null);
        const q = "CALL patchTool(?,?,?,?);";
        con.query(q, params, (err, rows) => {
            if(err) {
                res.status(500).json({
                    status: "Error!",
                    message: err.message 
                });
            } else {
                res.status(200).json({
                    status: "Success!",
                    message: rows
                });
            };
        });
    },

    patchTest: function(req,res,next){
        let params = [];
        params.push(parseInt(req.params.testID));
        params.push(req.body.tr ? req.body.tr : null);
        params.push(req.body.document ? req.body.document : null);
        params.push(req.body.section ? req.body.section : null);
        console.log(params);
        const q = "CALL patchTest(?,?,?,?);";
        con.query(q, params, (err, rows) => {
            if(err) {
                res.status(500).json({
                    status: "Error!",
                    message: err.message 
                });
            } else {
                res.status(200).json({
                    status: "Success!",
                    message: rows
                });
            };
        });
    }

};