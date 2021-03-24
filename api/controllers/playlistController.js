const { request, response } = require('express')
const connection = require('../connection')

const createPlaylist = (request, response) => {
    const playlist = request.body.playlist
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

const getPlaylists = (request, response) => {
    const username = request.params.id
    connection.pool.query(`SELECT * FROM Playlist_Account JOIN Playlist ON Playlist.id = 
    Playlist_Account.playlist_id WHERE Playlist_Account.username = '${username}'`
    ,(error,results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    createPlaylist,
    getPlaylists
}