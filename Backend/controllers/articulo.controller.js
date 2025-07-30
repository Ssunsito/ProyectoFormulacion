const Articulo = require("../models/articulo.model");

module.exports.CreateArticulo = async (request, response) => {
    const { nombre, descripcion, precio } = request.body;
    try {
        const articulo = await Articulo.create(request.body);
        response.status(201).json(articulo);
    } catch (error) {
        response.status(500).json({ message: "Error al crear el tipo de comida", error: error.message })
    }
}

module.exports.GetAllArticulo = async (_, response) => {
    try {
        const articulos = await Articulos.findAll();
        response.status(200).json(articulos);
    } catch (error) {
        response.status(500).json({ message: "Error al obtener los tipos de comida", error: error.message });
    }
}

module.exports.GetArticulo = async (request, response) => {
    try {
        const articulo = await Articulo.findOne({ where: { _id: request.params.id } });
        if (!articulo) {
            return response.status(404).json({ message: "Tipo de comida no encontrado" });
        }
        response.json(articulo);
    } catch (error) {
        response.status(500).json({ message: "Error al obtener el tipo de comida", error: error.message });
    }
}

module.exports.UpdateArticulo = async (request, response) => {
    try {
        const [updated] = await Articulo.update(request.body, {
            where: { _id: request.params.id }
        });
        if (updated) {
            const updatedArticulo = await Articulo.findOne({ where: { _id: request.params.id } });
            response.status(200).json(updatedArticulo);
        } else {
            response.status(404).json({ message: "Tipo de comida no encontrado" });
        }
    } catch (error) {
        response.status(500).json({ message: "Error al actualizar el tipo de comida", error: error.message });
    }
}

module.exports.DeleteArticulo = async (request, response) => {
    try {
        const deleted = await Articulo.findOne({ where: { _id: request.params.id } });
        if (!deleted) {
            return response.status(404).json({ message: "Tipo de comida no encontrado" });
        }

        await Articulo.destroy({ where: { _id: request.params.id } });
        response.status(201).json({ message: "Tipo de comida eliminado correctamente" });
    } catch (error) {
        response.status(500).json({ message: "Error al eliminar el tipo de comida", error: error.message });
    }
}