const {connetMySQL} = require('./db.js');

async function initMysql() {
    try {
        const db = await connetMySQL();

        await db.query(`
            CREATE TABLE IF NOT EXISTS goals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name   VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UPDATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP

            )
        `);
        
        await db.query(`CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name   VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UPDATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP

            )
         `);
         console.log("Tablas de My SQL verificadas o creadas exitosamente");
         return db;
    } catch (error) {
        console.error("Error al inicializar MySQL:", error);
       throw
    }       
}

module.exports = initMysql;