import CoinApi from '../services/coinapi'

let polo = new CoinApi()

const coinController = {
  getCoins: async ({ params: { period } }, res) =>
    !period
      ? res.status(400).send('rip')
      : res.json(await polo.getPrices(period))
}

export default coinController
