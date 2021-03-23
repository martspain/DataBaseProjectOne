const { request, response } = require('express')
const connection = require('../connection')

const getArtist = (request, response) => {
    const id = request.params.id
    connection.pool.query(`SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT id,name,preview_url,launch_date FROM Album_Artist AA INNER JOIN Album ALB
    ON AA.album_id = ALB.id WHERE AA.artist_id = A.id) X) AS albums FROM Artist A
    WHERE A.id = '${id}'`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const createArtist = (request, response) => {
    const artist = request.body.variables.artist
    const username = request.user.account.username
    connection.pool.query(`INSERT INTO Artist(id,artistic_name,username) 
    VALUES ('${artist.id}','${artist.artistic_name}','${username}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(201).json({ message: 'Artista creado' })
    })
}

module.exports = {
    getArtist,
    createArtist,
}