import express from 'express'
const router = express.Router()
import postController from '../controllers/postController.js'
import cheking from '../middlewares/chektoken.js'


router.post("/addpost",cheking.chekToken,postController.ADDPOST)
router.get("/",postController.GETPOST)

export default {
    router
}