const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')


const masseussesRouter = require('./controllers/masseusses')
app.use('/api/masseusses', masseussesRouter)


app.use(cors)
app.use(express.static('build'))
const server = http.createServer(app)
const PORT = 3001 // TODO -- CHANGE TO config.port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


module.exports = {
  app, server
}