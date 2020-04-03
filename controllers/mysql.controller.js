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
        params.push(req.query.brand ? req.query.brand : null);
        params.push(req.query.type ? req.query.type : null);
        params.push(req.query.tr ? req.query.tr : null);
        params.push(req.query.model ? req.query.model : null);
        const q = "CALL searchSQL(?,?,?,?);";        // Build query string with placeholders
        con.query(q, params, (err,rows) => {         // Call con.query(queryString, parameter Values, callback)
            res.send(rows);                          // Send results to browser
        });
        next(); // Go to next middleware function.
    },


    // This function is not ready. parameters for this won't be passed through
    // a URL query. I have to figure out where this info is coming from.
    // This will be used as a middleware function to get testIDs for the addFile query.
    getTestID: function(req,res,next){
        let params = [];
        params.push(req.query.tr ? req.query.tr : null);
        params.push(req.query.doc ? req.query.doc : null);
        params.push(req.query.sec ? req.query.sec : null);
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
        console.log(req.body);
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
    }

};