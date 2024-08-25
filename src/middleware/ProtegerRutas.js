const jwt = require("jsonwebtoken");
require('dotenv').config()
const protegerRutas = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "Acceso no autorizado, token no proporcionado" });
  }

  try {
    const tokenSinBearer = token.replace('Bearer ', "");
    
    const decoded = jwt.verify(tokenSinBearer, process.env.JWT_SECRET, {
      verifyOptions: {
        algorithms: ["HS256"],
        
      },
    });
  
    req.email = decoded;
    req.id = req.email.id;
    console.log(process.env.JWT_SECRET)

    if (!req.id) {
      return res
        .status(400)
        .json({ mensaje: "El token no contiene el id" });
    }

    next();
  } catch (error) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
};

module.exports = protegerRutas;