import { Router } from 'express'
import coinController from '../controllers/coin'

const router = new Router()

router.get('/prices/:period', coinController.getCoins)
router.get('/:id/add', coinController.add)
router.get('/:id/edit', coinController.edit)
router.get('/:id/remove', coinController.remove)

export default router
