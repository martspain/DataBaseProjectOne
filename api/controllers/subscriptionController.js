const { request, response } = require('express')
const connection = require('../connection')

/* Crea una suscripcion por un mes a la cuenta segun el token */ 
const subscribe = (request, response) => {
    const username = request.user.account.username
    connection.pool.query(`CALL BIN_CONTROL_INS('${username}', 'Subscription', '${username}')`,
    (error, results) => {
        console.log(results)
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

const deactivateNonSubscribed = (request, response) => {
    const account = request.body.account
    connection.pool.query(`CALL BIN_CONTROL_UPD('${account.username}', NULL, '${request.user.monitor.username}',
    'Account', 'active', NULL, '${account.active}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(202).json({ message: 'Cuenta actualizada exitosamente' })
    })
}

const removeSubscription = (request, response) => {
    const account = request.body.account
    connection.pool.query(`CALL BIN_CONTROL_DEL('${account.username}', NULL, '${request.user.monitor.username}',
    'Subscription')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(202).json({ message: 'Suscripcion eliminada exitosamente' })
    })
}

module.exports = {
    subscribe,
    nonSubscribedAccounts,
    subscribedAccounts,
    deactivateNonSubscribed,
    removeSubscription,
}
