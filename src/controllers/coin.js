import Poloniex from '../poloniex'

let polo = new Poloniex()

const coinController = {
  getCoins: async (req, res) => {
    const { period } = req.params
    if (!period) {
      res.status(400).send('rip')
    }
    const prices = await polo.getPrices(period)
    return res.json(prices)
  }
}

export default coinController
