import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from './config'

import userRouter from './routes/user'
import coinsRouter from './routes/coin'

console.log(process.env.PORT)
const app = express()

mongoose.promise = Promise
mongoose
  .connect(config.mongo)
  .then(() => console.log('Mongo connected'))
  .catch(e => console.log('Mongo failed to connect', e))

app.use(morgan('combined'))
app.use(bodyParser.json())
// Routes
app.use('/api/coins', coinsRouter)
app.use('/api/user', userRouter)

app.listen(config.port, function() {
  console.log(`App up on ${config.port}`)
})
