import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectToCloudinary from './config/cloudinary.js'
import adminRuter from './routes/adminRoutes.js'
import docRouter from './routes/doctorRoutes.js'
import userRoute from './routes/userRoutes.js'

const app =express()
const port = process.env.PORT || 4000
await connectDB()
connectToCloudinary()
// middlewares

app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin',adminRuter)
app.use('/api/doctor/',docRouter)
app.use('/api/user',userRoute)


app.get('/',(req,res)=>{
  res.send('API working ok')
})

app.listen(port,()=>{
  console.log('Server starts on ',port)
})