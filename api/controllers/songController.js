const { request, response } = require('express')
const connection = require('../connection')

const getSongs = (request, response) => {
    connection.pool.query(`SELECT *, S.id, S.name, A.name AS album, A.preview_url AS cover,
    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist A
    ON SA.artist_id = A.id WHERE SA.song_id = S.id) X) AS artists FROM Song S
    INNER JOIN Album A ON S.album_id = A.id`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const createSong = (request, response) => {
    const song = request.body.song
    const artistId = request.user.artist.id
    connection.pool.query(`INSERT INTO Song(id,name,duration_ms,preview_url,album_id) 
    VALUES ('${song.id}','${song.name}',${song.duration_ms},'${song.preview_url}','${song.album_id}')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else {
            song.artists?.forEach(async artist => {
                try {
                    await connection.pool.query(`INSERT INTO Song_Artist(song_id,artist_id) 
                    VALUES ('${song.id}','${artist}')`)
                } catch(error) {
                    response.status(500).json({ message: error.detail })
                }
            })
            response.status(201).json({ message: 'Cancion creada' })
        }
    })
}

module.exports = {
    getSongs,
    createSong,
}