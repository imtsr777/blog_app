import express from 'express'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import catgRoutes from './routes/catgRoutes.js'
import superUser from './routes/superAdminRoutes.js'
import fileupload from 'express-fileupload'
import postgres from './utils/postgres.js'
import path from 'path'

const PORT = process.env.PORT || 3001
const app = express()
app.use(fileupload())
app.use(postgres)
app.use(express.static(path.join(process.cwd(),"images")))
app.use(express.json())

app.use("/auth",authRoutes.router)
app.use('/users',userRoutes.router)
app.use('/post',postRoutes.router)

app.use('/categories',catgRoutes.router)
app.use('/superadmin',superUser.router)


app.listen(PORT,()=>{console.log("server is running "+PORT)})