import CoinApi from '../services/coinapi'

let polo = new CoinApi()

const coinController = {
  getCoins: async (req, res) => {
    const { period } = req.params
    if (!period) return res.status(400).send('rip')
    const prices = await polo.getPrices(period)
    return res.json(prices)
  }
}

export default coinController
