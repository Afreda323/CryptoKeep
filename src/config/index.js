const config = {
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO_URI || 'mongodb://localhost:27017/idk',
  secret: process.env.SECRET || 'lelz'
}

export default config
