const express = require('express')
const app = express()
const port = 3000
const account = require('./controllers/accountController')
const { getAlbums, getAlbum, createAlbum } = require('./controllers/albumController')
const { getArtist } = require('./controllers/artistController')
const { createPlaylist } = require('./controllers/playlistController')
const { search } = require('./controllers/searchController')
const song = require('./controllers/songController')
const subscription = require('./controllers/subscriptionController')
const { verifyToken, verifyArtist, verifySubscription } = require('./verificator')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
/* Recibe la cuenta en el body como Account */
app.post('/register', account.createAccount)
/* Devuelve el token */
app.post('/login', account.login)
/* Suscripcion por mes a la cuenta segun token */
app.post('/subscribe', verifyToken, subscription.subscribe)
/* Todas las canciones y sus artistas */
app.get('/songs', verifyToken, song.getSongs)
/* Todos los albumes con sus artistas y canciones (y artistas de canciones) */
app.get('/albums', verifyToken, getAlbums)
/* Crea un album para el artista */
app.post('/albums', verifyToken, verifyArtist, createAlbum)
/* Album con sus artistas y canciones (y artistas de canciones) */
app.get('/albums/:id', verifyToken, getAlbum)
/* Artista y sus albumes */
app.get('/artists/:id', verifyToken, getArtist)
/* Busca por nombre de cancion, nombre de artista, nombre de album y genero */
app.get('/search', verifyToken, search)
/* Crea una playlist del usuario */
app.post('/playlists', verifyToken, verifySubscription, createPlaylist)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})