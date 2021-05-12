const { request, response } = require('express')
const connection = require('../connection')

const getArtist = (request, response) => {
    const id = request.params.id
    connection.pool.query(`SELECT *,
    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT id,name,preview_url,launch_date,active, (SELECT ARRAY_AGG(ROW_TO_JSON(Y)) FROM
    (SELECT artist_id, artistic_name FROM Album_Artist AA2 INNER JOIN Artist ART
    ON AA2.artist_id = ART.id WHERE AA2.album_id = ALB.id) Y) AS artists
    FROM Album_Artist AA INNER JOIN Album ALB
    ON AA.album_id = ALB.id WHERE AA.artist_id = A.id) X) AS albums,

    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT id,name,duration_ms,album_id,active, (SELECT ARRAY_AGG(ROW_TO_JSON(Y)) FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist A
    ON SA.artist_id = A.id WHERE SA.song_id = S.id) Y) AS artists
    FROM Song_Artist SA INNER JOIN Song S
    ON SA.song_id = S.id WHERE SA.artist_id = A.id) X) AS songs

    FROM Artist A
    WHERE A.id = '${id}'`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows[0])
    })
}

const createArtist = (request, response) => {
    const artist = request.body.artist
    const username = request.user.account.username
    connection.pool.query(`INSERT INTO Artist(id,artistic_name,username) 
    VALUES ('${artist.id}','${artist.artistic_name}','${username}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(201).json({ message: 'Artista creado' })
    })
}

const getArtistsAccounts = (request, response) => {
    connection.pool.query(`SELECT A.username, first_name, last_name, email, active, id, artistic_name 
    FROM Account A INNER JOIN Artist ART ON A.username = ART.username`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    getArtist,
    createArtist,
    getArtistsAccounts,
}