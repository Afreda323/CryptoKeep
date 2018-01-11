import { promisify } from 'util'
import redis from 'redis'
import coinMarketCap from './cmc'

class Redis {
  constructor(PORT) {
    this.client = redis.createClient(PORT)
    this.getAsync = promisify(this.client.get).bind(this.client)
    console.log(`Redis Connected: ${PORT}`)
  }
  // attempt to fetch ticker data from redis
  getData = async () => {
    try {
      //attempt to pull ticker data from redis
      const data = await this.getAsync('ticker')
      if (data != null) {
        //if has data return the data
        console.log('Data pulled from redis')
        return JSON.parse(data)
      } else {
        //if not fetch new data
        const data = await coinMarketCap()
        //set data to redis
        this.client.set('ticker', JSON.stringify(data), 'EX', 60)
        console.log('Data pulled from API')
        return data
      }
    } catch (e) {
      console.log('Redis Error:')
      console.log(e)
    }
  }
}

export default Redis
