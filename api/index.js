const express = require('express')
const app = express()
const port = 3000
const account = require('./accountController')
const { getAlbums, getAlbum } = require('./albumController')
const { getArtist } = require('./artistController')
const song = require('./songController')
const subscription = require('./subscriptionController')
const { verifyToken, verifyArtist } = require('./verificator')

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
app.post('/register', account.postAccount)
/* Devuelve el token */
app.post('/login', account.login)
/* Suscripcion por mes a la cuenta segun token */
app.post('/subscribe', verifyToken, subscription.subscribe)
/* Todas las canciones y sus artistas */
app.get('/songs', verifyToken, song.getSongs)
/* Todos los albumes con sus artistas y canciones (y artistas de canciones) */
app.get('/albums', verifyToken, getAlbums)
/* Album con sus artistas y canciones (y artistas de canciones) */
app.get('/albums/:id', verifyToken, getAlbum)
/* Artista y sus albumes */
app.get('/artists/:id', verifyToken, getArtist)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})