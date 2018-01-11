import axios from 'axios'
const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

const coinMarketCap = async () => {
  const { data } = await axios.get(API_URL)
  return data
}

export default coinMarketCap
