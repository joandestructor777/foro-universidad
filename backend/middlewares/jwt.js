const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Creación de middleware y manejo de JWT para verificar si la ruta contiene un token valido y asi permitir acceso a la misma
const verifyToken = (req, res, next)=>{
    const foundToken = req.headers['authorization'];
    const token = foundToken && foundToken.split('')[1];

    if(!token) return res.status(404).json({message: 'Token not found, you´re not autenticated in this page, try again :)'})

    try{
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }catch(e){
        throw new Error('The token expires or maybe don´t exists')
    }
}

module.exports = { verifyToken }