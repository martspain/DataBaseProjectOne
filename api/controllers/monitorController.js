const { request, response } = require('express')
const connection = require('../connection')

const getNoMonitors = (request, response) => {
    connection.pool.query(`SELECT A.username, A.first_name, A.last_name, A.email FROM Account A
    LEFT JOIN Monitor M ON A.username = M.username WHERE M.id IS NULL
    ORDER BY A.username`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const createMonitor = (request, response) => {
    const monitor = request.body.monitor
    connection.pool.query(`INSERT INTO Monitor (username, monitor_type)
    VALUES ('${monitor.username}', '${monitor.monitor_type}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(201).json({ message: 'Monitor creado' })
    })
}

module.exports = {
    getNoMonitors,
    createMonitor,
}