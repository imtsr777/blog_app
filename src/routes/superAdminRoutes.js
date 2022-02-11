import  express  from "express"
const router = express.Router()
import superController from '../controllers/superController.js'
import cheking from '../middlewares/chektoken.js'

router.post('/addnewadmin',cheking.chekToken,superController.ADD_NEW_ADMIN)
router.post('/deleteadmin',cheking.chekToken,superController.DELETE_ADMIN)

export default{
    router
}