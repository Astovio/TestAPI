// Import mysql library
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testdata',
});

con.connect((err) => {
    if(err){
        console.log(err.message);
    } else {
        console.log('Connected to database');
    }
});

module.exports = con;