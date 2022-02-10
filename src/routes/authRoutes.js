import express from 'express'
import authController from '../controllers/authController.js'
import validation from '../middlewares/validates.js' 
const router = express.Router()



router.post("/login",authController.LOGIN)
router.post("/register",validation.registerValidator,authController.REGISTER)

export default {
    router
}