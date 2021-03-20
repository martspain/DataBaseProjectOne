const { request, response } = require('express')
const connection = require('./connection')
const jwt = require('jsonwebtoken');

const secretPassword = 'itsasecret';

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
            async (error, results) => {
                if (error) throw error
                if (results.rowCount > 0) {
                    const user = { account: results.rows[0] }
                    try {
                        const { rows } = await connection.pool.query(`SELECT * FROM Subscription 
                        WHERE username = '${user.account.username}'`)
                        user.subscription = rows[0]
                    } catch (error) {
                        throw error
                    }
                    try {
                        const { rows } = await connection.pool.query(`SELECT * FROM Artist 
                        WHERE username = '${user.account.username}'`)
                        user.artist = rows[0]
                    } catch (error) {
                        throw error
                    }
                    try {
                        const { rows } = await connection.pool.query(`SELECT * FROM Manager 
                        WHERE username = '${user.account.username}'`)
                        user.manager = rows[0]
                    } catch (error) {
                        throw error
                    }
                    const token = jwt.sign({ user },
                    secretPassword,
                    { expiresIn: '24h' })
                    response.status(200).json({ token, user })
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
    postAccount,
    login,
    secretPassword,
}