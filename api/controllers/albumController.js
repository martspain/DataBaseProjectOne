const { request, response } = require('express')
const connection = require('../connection')

const getAlbums = (request, response) => {
    connection.pool.query(`SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Album_Artist AA INNER JOIN Artist ART
    ON AA.artist_id = ART.id WHERE AA.album_id = A.id) X) AS artists FROM Album A`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const getAlbum = (request, response) => {
    const id = request.params.id
    connection.pool.query(`SELECT *, 
    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Album_Artist AA INNER JOIN Artist ART
    ON AA.artist_id = ART.id WHERE AA.album_id = A.id) X) AS artists,
    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist ART
    ON SA.artist_id = ART.id WHERE SA.song_id = S.id) X) AS artists
    FROM SONG S WHERE S.album_id = A.id) X) AS songs FROM Album A
    WHERE A.id = '${id}'`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const createAlbum = (request, response) => {
    const album = request.body.album
    const artistId = request.user.artist.id
    connection.pool.query(`INSERT INTO Album(id,name,preview_url,launch_date) 
    VALUES('${album.id}','${album.name}','${album.preview_url}','${album.launch_date}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else {
            album.artists?.forEach(async artistId => {
                try {
                    await connection.pool.query(`INSERT INTO Album_Artist(album_id,artist_id) 
                    VALUES ('${album.id}','${artistId}')`)
                } catch(error) {
                    response.status(500).json({ message: error.detail })
                }
            })
            response.status(201).json({ message: 'Album creado' })
        }
    })
}

module.exports = {
    getAlbums,
    getAlbum,
    createAlbum,
}