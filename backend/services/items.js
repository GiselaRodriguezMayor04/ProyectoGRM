const db = require('./db');
const helper = require('../helper');

async function insertData(req, res) {
    const data = req.query
    const result = await db.query(
        `insert into coleccion(nombre,marca,tipo,precio) values(?,?,?,?)`,
        [data.nombre,data.marca,data.tipo,data.precio]
    )
    return result.affectedRows
}

async function getData(req, res) {
    const rows = await db.query(
        `Select * from coleccion`
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(
        `Delete from coleccion where id = ${data.id}`
    )
    return result.affectedRows
}

module.exports = {
    getData,
    insertData,
    deleteData,
};