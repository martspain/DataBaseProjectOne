const { request, response } = require('express')
const connection = require('../connection')

/* Crea una suscripcion por un mes a la cuenta segun el token */ 
const subscribe = (request, response) => {
    const username = request.user.account.username
    const currentDate = new Date()
    const renewalDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    connection.pool.query(`INSERT INTO Subscription(renewal_date, username)
    VALUES ('${renewalDate.getFullYear()}-${renewalDate.getMonth()+1}-${renewalDate.getDate()}','${username}')`,
    (error, results) => {
        if (error) throw error
        response.status(201).json({ message: 'Subscription renewed' })
    })
}

module.exports = {
    subscribe,
}
