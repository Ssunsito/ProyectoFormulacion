const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
//require('./server/config/mongoose.config');

require('./config/sequelize.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allArticuloRoutes = require('./routes/articulo.routes');
const allUsuarioRoutes = require('./routes/usuario.routes');

allArticuloRoutes(app);
allUsuarioRoutes(app);

app.listen(port, function () {
    console.log('Server escuchando en el siguiente puerto: ', port);
});
