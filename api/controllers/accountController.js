const { request, response } = require('express')
const connection = require('../connection')
const jwt = require('jsonwebtoken');
const { secretPassword, refreshPassword } = require('../verificator');

const createAccount = (request, response) => {
    const data = request.body.account
    connection.pool.query(`INSERT INTO Account(username,password,first_name,last_name,email)
    VALUES('${data.username}','${data.password}','${data.first_name}','${data.last_name}','${data.email}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else {
            connection.pool.query(`SELECT username,first_name,last_name,email
            FROM Account WHERE username = '${data.username}'`,
            (error, results) => {
                if (error) response.status(500).json({ message: error.detail })
                else response.status(201).json(results.rows)
            })
        }
    })
}

const login = (request, response) => {
    const data = request.body.account
    connection.pool.query(`SELECT username,first_name,last_name,email
    FROM Account WHERE username = '${data.username}'`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else {
            if (results.rowCount > 0) {
                connection.pool.query(`SELECT username,first_name,last_name,email
                FROM Account WHERE username = '${data.username}' AND password = '${data.password}'`,
                async (error, results) => {
                    if (error) response.status(500).json({ message: error.detail })
                    else {
                        if (results.rowCount > 0) {
                            const user = { account: results.rows[0] }
                            try {
                                const { rows } = await connection.pool.query(`SELECT * FROM Subscription 
                                WHERE username = '${user.account.username}'`)
                                user.subscription = rows[0]
                            } catch (error) {
                                response.status(500).json({ message: error.detail })
                            }
                            try {
                                const { rows } = await connection.pool.query(`SELECT * FROM Artist 
                                WHERE username = '${user.account.username}'`)
                                user.artist = rows[0]
                            } catch (error) {
                                response.status(500).json({ message: error.detail })
                            }
                            try {
                                const { rows } = await connection.pool.query(`SELECT * FROM Manager 
                                WHERE username = '${user.account.username}'`)
                                user.manager = rows[0]
                            } catch (error) {
                                response.status(500).json({ message: error.detail })
                            }
                            try {
                                const { rows } = await connection.pool.query(`SELECT * FROM Monitor 
                                WHERE username = '${user.account.username}'`)
                                user.monitor = rows[0]
                            } catch (error) {
                                response.status(500).json({ message: error.detail })
                            }
                            const token = jwt.sign({ user },
                                secretPassword,
                                { expiresIn: '10m' }
                            )
                            const refreshToken = jwt.sign({ user },
                                refreshPassword,
                                { expiresIn: '1d' }    
                            )
                            response.status(200).json({ user, token, refreshToken })
                        } else response.status(401).json({ message: 'Contraseña incorrecta'})
                    }
                })
            } else response.status(401).json({ message: 'El usuario no existe'})
        }
    })
}

const generateRefreshToken = (request, response) => {
    const refreshToken = request.body.refreshToken
    if (refreshToken) {
        jwt.verify(refreshToken, refreshPassword, (error, authData) => {
            if (error) response.status(403).json({ message: 'refresh token no valido' })
            else {
                const token = jwt.sign({ user: authData.user },
                    secretPassword,
                    {expiresIn: '10m'}
                )
                response.status(200).json({ token })
            }
        })
    } else {
        response.status(403).json({ message: 'Acceso denegado! no se encontró el token en la solicitud' })
    }
}

module.exports = {
    createAccount,
    login,
    generateRefreshToken,
}