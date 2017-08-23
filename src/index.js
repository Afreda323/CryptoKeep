import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import userRouter from './routes/user'
import coinsRouter from './routes/coin'
//ENV
require('dotenv').config()
const {PORT, MONGO_URI} = process.env
//EXPRESS
const app = express()
//DB
mongoose.promise = Promise
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(e => console.log('Mongo failed to connect', e))
//Middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
// Routes
app.use('/api/coins', coinsRouter)
app.use('/api/user', userRouter)
//LISTEN
app.listen(PORT, function() {
  console.log(`App up on ${PORT}`)
})
