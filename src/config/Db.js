const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user:process.env.DB_USER,
    database: process.env.DB_DATABASE,

};

const pool = mysql.createPool(dbConfig);

    pool.getConnection()
        .then((connection)=>{
            console.log('Conexion exitosa a la base de datos');
            connection.release();
        })
        .catch((error)=>{
            console.error('Error en la conexion a la base de datos', error);
        });

module.exports = pool