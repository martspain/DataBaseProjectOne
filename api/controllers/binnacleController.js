const { request, response } = require('express')
const connection = require('../connection')

const getBinnacle = (request, response) => {
    connection.pool.query(`SELECT * FROM Binnacle ORDER BY record_date DESC`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    getBinnacle,
}