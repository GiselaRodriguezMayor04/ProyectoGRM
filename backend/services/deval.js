const db = require('./db');
const helper = require('../helper');

async function insertDataDeval(req, res) {
    const data = req.query
    const result = await db.query(
        `insert into devaluacion(articulo,meses,devaluacion) values(?,?,?)`,
        [data.articulo,data.meses,data.devaluacion,data.precio]
    )
    return result.affectedRows
}

async function getDataDeval(req, res) {
    const rows = await db.query(
        `Select * from devaluacion`
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteDataDeval(req, res) {
    const data = req.query
    const result = await db.query(
        `Delete from devaluacion where id = ${data.id}`
    )
    return result.affectedRows
}

module.exports = {
    getDataDeval,
    insertDataDeval,
    deleteDataDeval,
};