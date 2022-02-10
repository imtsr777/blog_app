import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'


router.route('/')
       .get(userController.GET)

export default {
    router
}