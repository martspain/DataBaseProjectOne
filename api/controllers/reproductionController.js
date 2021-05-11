const { request, response } = require('express')
const connection = require('../connection')

const createReproduction = (request, response) => {
    const username = request.user.account.username
    const song_id = request.params.id
    connection.pool.query(`INSERT INTO Reproduction(song_id,username)
    VALUES ('${song_id}','${username}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200)
    })
}

const accountReproductions = (request, response) => {
    const username = request.user.account.username
    connection.pool.query(`SELECT COUNT(*) FROM Reproduction
    WHERE username = '${username}' AND rep_date >= CURRENT_DATE - (INTERVAL '1 day')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    createReproduction,
    accountReproductions,
}