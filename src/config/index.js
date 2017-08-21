const config = {
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO_URI || 'mongodb://localhost:27017/coinz',
  secret: process.env.SECRET || 'coinz'
}

export default config
