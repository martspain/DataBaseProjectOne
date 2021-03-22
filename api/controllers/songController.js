const { request, response } = require('express')
const connection = require('../connection')

const getSongs = (request, response) => {
    connection.pool.query(`SELECT *, S.id, S.name, A.name AS album, A.preview_url AS cover,
    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist A
    ON SA.artist_id = A.id WHERE SA.song_id = S.id) X) AS artists FROM Song S
    INNER JOIN Album A ON S.album_id = A.id`,
    (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSongs,
}