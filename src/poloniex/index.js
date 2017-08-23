import axios from 'axios'
import qs from 'qs'

const PAIRS = ['USDT_BTC', 'USDT_ETH', 'USDT_XRP', 'USDT_LTC']

const BASE_URL = 'https://poloniex.com/public'

const periods = ['hour', 'day', 'week', 'month', 'year']

export default class Poloniex {
  constructor() {
    this.baseUrl = BASE_URL
  }
  getTimes = period => {
    let end = new Date()
    let start = new Date()
    if (!periods.includes(period)) {
      period = 'day'
    }
    switch (period) {
      case 'hour':
        start.setUTCHours(end.getUTCHours() - 1)
        break
      case 'day':
        start.setUTCDate(end.getUTCDate() - 1)
        break
      case 'week':
        start.setUTCDate(end.getUTCDate() - 7)
        break
      case 'month':
        start.setUTCMonth(end.getUTCMonth() - 1)
        break
      case 'year':
        start.setUTCFullYear(end.setUTCFullYears() - 1)
        break
      default:
        start.setUTCDate(end.getUTCDate() - 1)
        break
    }
    const diff = (end.getTime() - start.getTime()) / 1000
    let csPeriod = diff / 12
    if (period === 'week') {
      csPeriod = 14400
    } else if (period === 'month' || period === 'year') {
      csPeriod = 86400
    }
    start = start.getTime() / 1000
    end = end.getTime() / 1000
    return { start, end, csPeriod }
  }
  createRequestUrl = (currencyPair, start, end, period) => {
    const obj = {
      currencyPair,
      start,
      end,
      period
    }
    const query = qs.stringify(obj)
    return `${this.baseUrl}?command=returnChartData&${query}`
  }

  getPrices = async period => {
    let prices = {}
    const { start, end, csPeriod } = this.getTimes(period)
    for (let pair of PAIRS) {
      const symbol = pair.split('_')[1]
      let rates = []
      const { data } = await axios.get(
        this.createRequestUrl(pair, start, end, csPeriod)
      )
      for (let rate of data) {
        rates.push(rate.close)
      }
      prices[symbol] = rates
    }
    return prices
  }
}
