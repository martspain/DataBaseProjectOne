const { request, response } = require('express')
const connection = require('../connection')

const getGenre = (request, response) => {
    const id = request.params.id
    connection.pool.query(`SELECT G.name, (SELECT ARRAY_AGG(ROW_TO_JSON(Y)) FROM
    (SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist A
    ON SA.artist_id = A.id WHERE SA.song_id = S.id) X) AS artists
    FROM Song_Genre SG INNER JOIN Song S
    ON SG.song_id = S.id) Y) AS songs FROM Genre G WHERE G.id = ${id}`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(201).json({ message: 'Manager creado' })
    })
}

module.exports = {
    getGenre,
}