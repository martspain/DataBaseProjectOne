const { request, response } = require('express')
const connection = require('./connection')
const jwt = require('jsonwebtoken');

const secretPassword = 'itsasecret';

const getAccounts = (request, response) => {
    connection.pool.query('SELECT username,first_name,last_name,email FROM Account',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const postAccount = (request, response) => {
    const data = request.body.variables.account
    connection.pool.query(`INSERT INTO Account(username,password,first_name,last_name,email)
    VALUES('${data.username}','${data.password}','${data.first_name}','${data.last_name}','${data.email}')`,
    (error, results) => {
        if (error) throw error
        connection.pool.query(`SELECT username,first_name,last_name,email
        FROM Account WHERE username = '${data.username}'`,
        (error, results) => {
            if (error) throw error
            response.status(201).json(results.rows)
        })
    })
}

const login = (request, response) => {
    const data = request.body.variables.login
    connection.pool.query(`SELECT username,first_name,last_name,email
    FROM Account WHERE username = '${data.username}'`,
    (error, results) => {
        if (error) throw error
        if (results.rowCount > 0) {
            connection.pool.query(`SELECT username,first_name,last_name,email
            FROM Account WHERE username = '${data.username}' AND password = '${data.password}'`,
            (error, results) => {
                if (error) throw error
                if (results.rowCount > 0) {
                    const token = jwt.sign({ username: data.username},
                    secretPassword,
                    { expiresIn: '24h' })
                    response.status(200).json({ token })
                } else {
                    response.status(401).json({ message: 'Contraseña incorrecta'})
                }
            })
        } else {
            response.status(401).json({ message: 'El usuario no existe'})
        }
    })
}

module.exports = {
    getAccounts,
    postAccount,
    login,
}