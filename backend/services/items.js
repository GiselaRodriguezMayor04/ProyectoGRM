//Aquí se cambia la base de datos

const db = require('./db');
const helper = require('../helper');
const { Select } = require('@mui/material')

async function insertData(req, res) {
    const data = req.query;

    const query = `INSERT INTO prestamos (articulo, persona, fecha) VALUES (?, ?, ?)`;
    const values = [data.articulo, data.persona, data.fecha];
    const result = await db.query(query, values);

    return result.affectedRows;
}

async function getData(req, res) {
    const rows = await db.query(`
        SELECT * FROM prestamos
    `);
    const data = helper.emptyOrRows(rows);
    return {
        data
    };
}

async function deleteData(req, res) {
    const data = req.query;
    const result = await db.query(
        `DELETE FROM prestamos WHERE id = ${data.id}`
    );
    return result.affectedRows;
}

module.exports = {
    getData,
    insertData,
    deleteData
};
