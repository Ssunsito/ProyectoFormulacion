const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Usuario = sequelize.define('Usuario', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "El email debe ser válido"
            },
            notEmpty: {
                msg: "El email es obligatorio"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, "La contraseña es obligatoria"]
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        
    }
    
});

module.exports = Usuario;