const express = require('express')
const app = express()
const port = 3000
const account = require('./accountController')
const song = require('./songController')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/accounts', account.getAccounts)
app.post('/accounts', account.postAccount)
app.post('/login', account.login)
app.get('/songs', song.getSongs)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})