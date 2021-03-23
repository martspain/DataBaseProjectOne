const { request, response } = require('express')
const connection = require('../connection')

const createPlaylist = (request, response) => {
    const playlist = request.body.variables.playlist
    const username = request.user.account.username
    connection.pool.query(`INSERT INTO Playlist(id,name,description,username) 
    VALUES(DEFAULT,'${playlist.name}','${playlist.description}','${username}')
    RETURNING id`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else {
            connection.pool.query(`INSERT INTO Playlist_Account(playlist_id,username) 
            VALUES ('${results.rows[0].id}','${username}')`,
            (error, results) => {
                if (error) response.status(500).json({ message: error.detail })
                else response.status(201).json({ message: 'Tu playlist ha sido creada' })
            })
        }
    })
}

module.exports = {
    createPlaylist,
}