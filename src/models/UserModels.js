 const db = require('../config/Db');
 const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");

 const registerUser = async (name, email, password)=>{
     let connection;
     try{
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );

        if (rows.length) {
            throw new Error('este correo ya esta registrado')
        };

        const encriptado = 10;
        const hash = await bcrypt.hash(password, encriptado);

        await connection.query(
            'INSERT INTO users (name, email, password) VALUES (?,?,?)',
            [name, email, hash]
        );
        await connection.commit();
        console.log('Usuario registrado correctamente');
        return{mensaje: 'Usuario registrado correctamente'};

     }catch(error){
        if (connection) {
            await connection.rollback();
        };
        throw new Error(error.message);
     }finally{
        if(connection){
            connection.release();
        };
     };
 };

 const getUsers = async () =>{
    let connection

    try{
        connection = await db.getConnection()
        const [rows] = await connection.query('SELECT * FROM users');
        return rows;
    }catch(error){
        if(connection){
            await connection.rollback();
        }
        throw new Error(error.message);
    }finally{
        if (connection) {
            connection.release()
        }
    }
 };

 const signInUsers = async(email, password)=>{
    let connection
    try{
        connection =  await db.getConnection()
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if(!rows.length){
            throw new Error("El usuario no existe");
        }
        const users = rows[0]
        const correctPass = await bcrypt.compare(password, users.password)
        if(!correctPass){
            throw new Error('Credenciales incorrectas');
        }
        const token = jwt.sign(
            {
                id: users.id,
                email: users.email
            },
            process.env.JWT_SECRET
            
        );
        console.log(process.env.JWT_SECRET)

        await connection.commit();
        return {mensaje: 'Inicio de sesion exitoso', token}

        }catch(error){
            throw new Error(error.message)

        }finally{
            if(connection){
                connection.release()
            }
        }
 }

 module.exports = {
    registerUser,
    getUsers,
    signInUsers
 }