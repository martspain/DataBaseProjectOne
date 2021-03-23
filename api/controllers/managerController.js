const { request, response } = require('express')
const connection = require('../connection')

const createManager = (request, response) => {
    const manager = request.body.variables.manager
    const username = request.user.account.username
    connection.pool.query(`INSERT INTO Manager(id,username) 
    VALUES ('${manager.id}','${username}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(201).json({ message: 'Manager creado' })
    })
}

module.exports = {
    createManager,
}