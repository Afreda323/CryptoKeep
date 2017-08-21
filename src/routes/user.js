import { Router } from 'express'
import userController from '../controllers/user'

const router = new Router()

router.get('/', userController.getUser)
router.get('/signup', userController.signupUser)
router.get('/login', userController.loginUser)
router.get('/deactivate', userController.deactivateUser)

export default router
