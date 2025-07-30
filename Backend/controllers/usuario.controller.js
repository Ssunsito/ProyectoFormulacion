const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, '12345678', { expiresIn: '30d' });
}
module.exports.CreateUsuario = async (request, response) => {
    const { nombre, email, password } = request.body;
    if (!nombre || !email || !password) {
        return response.status(400).json({ message: "Todos los campos son obligatorios" });

    } else {
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return response.status(400).json({ message: "El usuario ya existe" });
        }
        else {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const usuario = await Usuario.create({ nombre, email, password: hashedPassword });
                response.status(201).json({nombre: usuario.nombre, email: usuario.email, _id: usuario._id, token: generateToken(usuario._id) });
            } catch (error) {
                response.status(500).json({ message: "Error al crear el usuario", error: error.message });
            }
        }
    }
}

module.exports.GetAllUsuarios = async (_, response) => {
    try {
        const usuarios = await Usuario.findAll();
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
}

module.exports.GetUsuario = async (request, response) => {
    try {
        const usuario = await Usuario.findOne({ where: { _id: request.params.id } });
        if (!usuario) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        response.json(usuario);
    } catch (error) {
        response.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
}

module.exports.UpdateUsuario = async (request, response) => {
    try {
        const [updated] = await Usuario.update(request.body, {
            where: { _id: request.params.id }
        });
        if (updated) {
            const updatedUsuario = await Usuario.findOne({ where: { _id: request.params.id } });
            response.status(200).json(updatedUsuario);
        } else {
            response.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        response.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
}

module.exports.DeleteUsuario = async (request, response) => {
    try {
        const deleted = await Usuario.findOne({ where: { _id: request.params.id } });
        if (!deleted) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }

        await Usuario.destroy({ where: { _id: request.params.id } });
        response.status(201).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        response.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
}

module.exports.LoginUsuario = async (request, response) => {
    const {email, password} = request.body;
    const usuarioEncontrado = await Usuario.findOne({where: {email}});
    if(!usuarioEncontrado){
        return response.status(400).json({message: "Usuario no encontrado"});
    }
    if(usuarioEncontrado && (await bcrypt.compare(password, usuarioEncontrado.password))){
        response.status(200).json({message: "Usuario logueado correctamente", nombre: usuarioEncontrado.nombre, token: generateToken(usuarioEncontrado._id)});
    }else{
        response.status(400).json({message: "Inicio de sesión fallido"});
    }
}