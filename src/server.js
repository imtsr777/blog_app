import express from 'express'
import userRouter from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postgres from './utils/postgres.js'

const PORT = process.env.PORT || 3001
const app = express()

app.use(postgres)

app.use(express.json())

app.use("/auth",authRoutes.router)
app.use('/users',userRouter.router)



app.listen(PORT,()=>{console.log("server is running "+PORT)})