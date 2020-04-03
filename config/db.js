// Import mysql library
const mysql = require('mysql');

const connectDB = async() => {
    try {
        const con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'testdata',
        });
        
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;