import express from 'express'
import { bookAppointment, getUser, registerUser, updateUser, userLogin,getAllAppointments, cancelappointment, paymentApi, verifyRazorpay } from '../controllers/userController.js'
import userAuth from '../middlewares/userAuth.js'
import upload from '../middlewares/multer.js'

const userRoute= express.Router()


userRoute.post('/register',registerUser)
userRoute.post("/login",userLogin)
userRoute.get('/get-profile',userAuth,getUser)
userRoute.post('/update-profile',userAuth,upload.single('image') ,updateUser)
userRoute.post('/book-appointment',userAuth,bookAppointment)
userRoute.get('/list-appointments',userAuth,getAllAppointments)
userRoute.post('/cancle-appointment',userAuth,cancelappointment)
userRoute.post('/payment-razorpay',userAuth,paymentApi)
userRoute.post('/verify-payment',userAuth,verifyRazorpay)


export default userRoute

