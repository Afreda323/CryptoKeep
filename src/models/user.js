import { Schema, model } from 'mongoose'
import Coin from './coin'
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  coins: [
    {
      type: Coin
    }
  ]
})

// Password stuff
userSchema.pre('save', () => {})
userSchema.methods.comparePassword = (pw, cb) => {}

const User = model('user', userSchema)
export default User
