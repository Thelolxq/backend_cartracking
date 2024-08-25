const Users = require('../models/UserModels');
const joi = require('joi')

const scheme = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const registerUser = async(req,res)=>{
    
    
    const { name, email, password } = req.body;
    try{
        const {error} = scheme.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message})
        }
        const user = await Users.registerUser(name, email, password)
        res.json(user)
     }catch(error){
        res.status(500).json({error: error.message})
     }
};

const getUsers = async(req, res)=>{
    try{
        const users = await Users.getUsers()
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const signInUsers = async(req,res)=>{
    const { email, password } = req.body
    if(!email || typeof email != 'string'){
        return res.status(400).json({error: 'email no valido'})
    }
    try{
        const userSignIn = await Users.signInUsers(email, password)
        res.json(userSignIn)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    registerUser,
    getUsers,
    signInUsers
}