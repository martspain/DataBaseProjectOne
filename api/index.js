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
app.post('/register', account.postAccount)
app.post('/login', account.login) // Devuelve el token
app.post('/subscribe', verifyToken, subscription.subscribe)
app.get('/songs', verifyToken, song.getSongs)
app.get('/albums', verifyToken, getAlbums)
app.get('/albums/:id', verifyToken, getAlbum)
app.get('/artists/:id', verifyToken, getArtist)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})