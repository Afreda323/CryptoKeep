import { Router } from 'express'
import userController from '../controllers/user'

const router = new Router()
router.get('/', userController.getUser)
router.post('/signup', userController.signupUser)
router.post('/login', userController.loginUser)
router.post('/deactivate', userController.deactivateUser)
router.get('/addCoins', userController.addCoins)
router.put('/editCoins', userController.editCoins)
router.delete('/removeCoins', userController.removeCoins)

export default router
