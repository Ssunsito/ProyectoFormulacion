const UsuarioController = require('../controllers/usuario.controller');
const { protect } = require('../middleware/autorizacion.middleware');

module.exports = function(app) {
    app.get('/api/usuarios', protect, UsuarioController.GetAllUsuarios);
    app.get('/api/usuarios/:id', UsuarioController.GetUsuario);
    app.post('/api/usuarios', UsuarioController.CreateUsuario);
    app.put('/api/usuarios/:id', UsuarioController.UpdateUsuario);
    app.delete('/api/usuarios/:id', UsuarioController.DeleteUsuario);
    app.post('/api/usuarios/login', UsuarioController.LoginUsuario);
}