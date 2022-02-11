import express from 'express'
import catgController from '../controllers/catgController.js'
import cheking from '../middlewares/chektoken.js'

const router = express.Router()

router.get("/",catgController.GET_CATEGORY)
router.put("/update",cheking.chekToken,catgController.UPDATE_CATEGORY)


export default {
    router
}