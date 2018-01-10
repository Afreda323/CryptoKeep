// Npm imports
import http from 'http'
import express from 'express'
import redis from 'redis'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import SocketIO from 'socket.io'

//.env
require('dotenv').config()
const { PORT, REDIS_PORT } = process.env

// redis
const client = redis.createClient(REDIS_PORT)
console.log(`Redis Connected: ${REDIS_PORT}`)

//express
const app = express()
const server = http.Server(app)

//middleware
app.use(morgan('combined'))
app.use(bodyParser.json())

//socket.io
const io = new SocketIO(server)

// handle disconnection
io.on('connection', socket => {
  console.log(`Client ${socket.id} connected.`)

  // Coin refresh interval
  setInterval(() => {
    io.emit('refresh', 'Hello')
  }, 3000)
  
  // handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected.`)
  })
})

//listen
server.listen(PORT, function() {
  console.log(`App Running: ${PORT}`)
})
