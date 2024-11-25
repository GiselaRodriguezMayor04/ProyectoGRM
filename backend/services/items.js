const db = require('./db');
const helper = require('../helper');

async function insertData(req, res) {
    try {
        const { nombre, marca, tipo, precio } = req.query;

        if (!nombre || !marca || !tipo || !precio) {
            throw new Error('Todos los campos (nombre, marca, tipo, precio) son obligatorios');
        }

        if (isNaN(precio) || parseFloat(precio) <= 0) {
            throw new Error('El campo "precio" debe ser un número positivo');
        }

        const query = `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`;
        const values = [nombre, marca, tipo, parseFloat(precio)];
        const result = await db.query(query, values);

        return res.status(200).json({
            affectedRows: result.affectedRows,
            message: 'Datos insertados correctamente',
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

async function getData(req, res) {
    try {
        const rows = await db.query(`
            SELECT * FROM coleccion
        `);
        const data = helper.emptyOrRows(rows);

        return res.status(200).json({
            data,
            message: 'Datos recuperados correctamente',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

async function deleteData(req, res) {
    try {
        const { id } = req.query;

        if (!id) {
            throw new Error('El campo "id" es obligatorio');
        }

        if (isNaN(id) || parseInt(id, 10) <= 0) {
            throw new Error('El campo "id" debe ser un número positivo');
        }

        const query = `DELETE FROM coleccion WHERE id = ?`;
        const values = [parseInt(id, 10)];
        const result = await db.query(query, values);

        return res.status(200).json({
            affectedRows: result.affectedRows,
            message: result.affectedRows > 0 ? 'Dato eliminado correctamente' : 'No se encontró el registro',
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getData,
    insertData,
    deleteData,
};
