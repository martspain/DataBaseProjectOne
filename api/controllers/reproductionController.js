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

const generateRandomDate = (start, end) => {
    const startDate = new Date(start.split('-')[0], parseInt(start.split('-')[1])-1, start.split('-')[2])
    const endDate = new Date(end.split('-')[0], parseInt(end.split('-')[1])-1, end.split('-')[2])
    endDate.setDate(endDate.getDate()+1)
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    const formated = `${randomDate.getFullYear()}-${randomDate.getMonth()+1}-${randomDate.getDate()}`
    return formated
}

const generateReproductions = (request, response) => {
    const { startDate, endDate, quantity } = request.body.data
    ;(async () => {
        const client = await connection.pool.connect()
        try {
            await client.query('BEGIN')
            for (let i=0; i<quantity; i++) {
                const randomDate = generateRandomDate(startDate, endDate)
                const randomSong = await client.query(`SELECT S.id FROM Song S 
                INNER JOIN Album A ON S.album_id = A.id 
                WHERE launch_date <= '${randomDate}' ORDER BY random() LIMIT 1`)
                const randomAccount = await client.query('SELECT username FROM Account ORDER BY random() LIMIT 1')
                await client.query(`INSERT INTO Reproduction(song_id,username,rep_date)
                VALUES ('${randomSong.rows[0].id}','${randomAccount.rows[0].username.replace('\'','\'\'')}','${randomDate}')`)
            }
            await client.query('COMMIT')
            response.status(201).json({ message: 'Reproducciones creadas' })
        } catch (e) {
            await client.query('ROLLBACK')
            response.status(500).json({ message: 'Error al crear las reproducciones' })
            throw e
        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))
}

module.exports = {
    createReproduction,
    accountReproductions,
    generateReproductions,
}