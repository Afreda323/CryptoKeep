// Npm imports
import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import SocketIO from 'socket.io'
import Redis from './services/redis'
//.env
require('dotenv').config()
const { PORT, REDIS_PORT } = process.env

//redis
const redis = new Redis(REDIS_PORT)

//express
const app = express()
const server = http.Server(app)

//middleware
app.use(morgan('combined'))
app.use(bodyParser.json())

//socket.io
const io = new SocketIO(server)

// handle disconnection
io.on('connection', async socket => {
  console.log(`Client ${socket.id} connected.`)

  // Coin refresh interval
  setInterval(async () => {
    const data = await redis.getData()
    io.emit('refresh', data)
    console.log('Sent ticker data to user')
  }, 5000)

  // handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected.`)
  })
})

//listen
server.listen(PORT, function() {
  console.log(`App Running: ${PORT}`)
})
