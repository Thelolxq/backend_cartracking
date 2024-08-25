const db = require('../config/Db');



const Ubicacion = async(ubicacion, lat, lng, id)=>{
    let connection;
    try{
        connection = await db.getConnection();
         const punto = `POINT(${lat} ${lng})`
        await connection.query(
            'INSERT INTO location (ubicacion, cordenadas , id) VALUES (?, ST_GeomFromText(?),?)',
            [ubicacion, punto, id]
        )
        await connection.commit()
        console.log('ubicacion registrada correctamente')
        return{mensaje: 'ubicacion registrada correctamente'};
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

    const GetUbi = async ()=>{
        let connection
        try{
            connection = await db.getConnection()
           const [rows] =  await connection.query(
                'SELECT * FROM location'
            )
            return rows
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
    }

    

    module.exports = {
        Ubicacion,
        GetUbi
    }