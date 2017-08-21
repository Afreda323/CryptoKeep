import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    //User
  }
)

const User = model('user', userSchema)

export default User
