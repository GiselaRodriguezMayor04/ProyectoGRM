const db = require('./db');
const helper = require('../helper');

async function insertData(req, res) {
    const data = req.query
    const result = await db.query(
        `insert into usuarios(nombre,login,password,rol) values(?,?,?,?)`,
        [data.nombre,data.login,data.password,data.rol]
    )
    return result.affectedRows
}

async function getData(req, res) {
    const rows = await db.query(
        `Select * from usuarios`
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(
        `Delete from usuarios where id = ${data.id}`
    )
    return result.affectedRows
}

module.exports = {
    getData,
    insertData,
    deleteData,
};