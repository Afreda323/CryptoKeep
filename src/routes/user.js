import { Router } from 'express'
import UserController from '../controllers/user'

const router = new Router()

router.get('/', UserController.getUser)

export default router
