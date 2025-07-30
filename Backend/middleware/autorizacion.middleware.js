const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

module.exports.protect = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization;
            console.log('Token recibido con Bearer: ', token);
            token = token.split(' ')[1];
            console.log('Token extraído: ', token);
            //Verificación de token
            const decoded = jwt.verify(token, '12345678');
            //Agrega a cada peticion la información del usuario excepto el password
            req.usuario = await Usuario.findByPk(decoded.id); //se crea en el objeto req un objeto Usuario
            if(!req.usuario){
                console.log("Usuario no encontrado");
            }
            console.log(req.usuario);
            next();
        }catch (error) {
            return res.status(401).json({ message: "No autorizado!" });
        }
    }
    if(!token){
        return res.status(401).json({message: "No autorizado, token inválido!"});
    }    
}