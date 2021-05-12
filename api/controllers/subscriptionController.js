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
        if (error) response.status(500).json({ message: error.detail })
        else response.status(201).json({ message: 'Subscription renewed' })
    })
}

const nonSubscribedAccounts = (request, response) => {
    connection.pool.query(`SELECT username, first_name, last_name, email, active
    FROM Account WHERE username NOT IN (SELECT username FROM Subscription)`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const subscribedAccounts = (request, response) => {
    connection.pool.query(`SELECT A.username, first_name, last_name, email, active, start_date, renewal_date
    FROM Account A INNER JOIN Subscription S ON A.username = S.username WHERE renewal_date >= CURRENT_DATE`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    subscribe,
    nonSubscribedAccounts,
    subscribedAccounts,
}
