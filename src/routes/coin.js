import { Router } from 'express'
import coinController from '../controllers/coin'

const router = new Router()
router.get('/prices/:period', coinController.getCoins)

export default router
