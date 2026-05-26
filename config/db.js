const mysql = require("mysql2/promise");

const   connetMysql = async () => {
    try {
        const pool = mysql.createPool({
            host: "localhost",
            port:3306,
            user:"app_user",
            password:"app_password",
        });
        console.log("Connected to MySQL database");
        return pool;
    }   catch (error) { 
        console.error("Error connecting to MySQL database:", error);
        process.exit(1);

    }};
    
    module.exports = connetMysql;

