import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctors, adminLogin, cancleAppointment, getAdminAppointments, getAllDoctors, getDashbordData } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import {changeAvailablity} from '../controllers/doctorController.js'

const adminRouter = express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctors)
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,getAllDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/admin-appointments',authAdmin,getAdminAppointments)
adminRouter.post('/cancle-appointment',authAdmin,cancleAppointment)
adminRouter.get('/dashbord',authAdmin,getDashbordData)

export default adminRouter