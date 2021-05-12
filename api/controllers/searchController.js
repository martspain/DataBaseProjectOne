const { request, response } = require('express')
const connection = require('../connection')

const search = (request, response) => {
    const toFind = request.body.toFind
    connection.pool.query(`SELECT ROW_TO_JSON(X) AS found, 'song' AS type FROM (SELECT 
    S.*, ALB.name AS album, ALB.preview_url AS cover,
    (SELECT ARRAY_AGG(ROW_TO_JSON(Y)) AS artists FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist A
    ON SA.artist_id = A.id WHERE SA.song_id = S.id) Y) FROM Song S INNER JOIN Album ALB
    ON S.album_id = ALB.id WHERE S.name ILIKE '%${toFind}%') X 
    UNION ALL
    SELECT ROW_TO_JSON(X) AS found, 'artist' AS type FROM (SELECT * FROM Artist
    WHERE artistic_name ILIKE '%${toFind}%') X 
    UNION ALL
    SELECT ROW_TO_JSON(X) AS found, 'album' AS type FROM (SELECT *,
    (SELECT ARRAY_AGG(ROW_TO_JSON(Y)) AS artists FROM
    (SELECT artist_id, artistic_name FROM Album_Artist AA INNER JOIN Artist ART
    ON AA.artist_id = ART.id WHERE AA.album_id = A.id) Y) FROM Album A
    WHERE name ILIKE '%${toFind}%') X 
    UNION ALL
    SELECT ROW_TO_JSON(X) AS found, 'genre' AS type FROM (SELECT * FROM Genre
    WHERE name ILIKE '%${toFind}%') X
    UNION ALL
    SELECT ROW_TO_JSON(X) AS found, 'playlist' AS type FROM (SELECT * FROM Playlist
    WHERE name ILIKE '%${toFind}%') X`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const searchArtist = (request, response) => {
    const toFind = request.body.toFind
    connection.pool.query(`SELECT ROW_TO_JSON(X) AS found FROM (SELECT * FROM Artist
    WHERE artistic_name ILIKE '%${toFind}%') X`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    search,
    searchArtist,
}