const ArticuloController = require('../controllers/articulo.controller');

module.exports = function(app){
    app.get('/api/tipocomida', ArticuloController.GetAllArticulo);
    app.post('/api/tipocomida', ArticuloController.CreateArticulo);
    app.get('/api/tipocomida/:id', ArticuloController.GetArticulo);
    app.put('/api/tipocomida/:id', ArticuloController.UpdateArticulo);
    app.delete('/api/tipocomida/:id', ArticuloController.DeleteArticulo);
}