import { Schema, model } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

const coinSchema = new Schema({
  user: {
    type: ObjectId,
    required: true
  },
  coin: {
    type: String,
    enum: ['BTC', 'ETH', 'LTC', 'XRP'],
    required: true
  },
  buy: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const Coin = model('coin', coinSchema)
export default Coin
