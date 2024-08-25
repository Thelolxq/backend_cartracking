const Gps = require('../models/GpsModels');
const joi = require('joi')

const scheme = joi.object({
    lat: joi.number().required(),
    lng: joi.number().required()
})

const Ubicacion = async(req, res)=>{
    const {ubicacion, lat, lng} = req.body;
    const id = req.id
    try{

        const {error} = scheme.validate(req.body)
        if(error){
            return res.status(400).json({error: error.details[0].message})
        }
        const ubi = await Gps.Ubicacion(ubicacion, lat, lng, id);
        res.json(ubi);
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const GetUbi = async (req, res)=>{
    try{
        const ubi = await Gps.GetUbi()
        res.json(ubi)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    Ubicacion,
    GetUbi
}