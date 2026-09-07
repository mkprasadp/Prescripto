import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
//api to register new User

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details!' })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid Email!' })
    }
    if (password.length < 8) {
      return res.json({ success: false, nessage: 'Need a Strong Password' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)


    const userData = {
      name,
      email,
      password: hashPassword
    }
    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })


  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }

}

// user login api

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.json({ success: false, message: 'Missing Details!' })
    }
    const userData = await userModel.findOne({ email })

    if (!userData) {
      return res.json({ success: false, message: 'User dose not Exists!' })
    }

    const isMatched = await bcrypt.compare(password, userData.password)
    if (isMatched) {
      const token = await jwt.sign({ id: userData._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    }
    else {
      res.json({ sucess: false, message: "Invalid Credentials" })

    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
const getUser = async (req, res) => {
  try {
    const userId = req.userId

    const user = await userModel.findById(userId).select('-password')
    if (user) {
      res.json({ success: true, user })
    } else {
      return res.json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })

  }
}
//update Data

const updateUser = async (req, res) => {
  try {
    const { name, phone, dob, address, gender } = req.body
    const userId = req.userId

    const imageFile = req.file
    if (!name || !phone || !dob || !gender || !address) {

      return res.json({ success: false, message: "Missing Details" })
    }

    console.log(JSON.parse(address))
    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageUrl = imageUpload.secure_url
      await userModel.findByIdAndUpdate(userId, { image: imageUrl })
    }
    res.json({ success: true, message: "User updated" })
  } catch (error) {

    res.json({ success: false, message: error.message })

  }
}


const bookAppointment = async (req, res) => {
  try {
    const { docId, slotTime, slotDate } = req.body
    console.log(req.body)
    const userId = req.userId
    const docData = await doctorModel.findById(docId).select('-password')
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor not Available!' })
    }

    const slots_booked = docData.slots_booked

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        res.json({ success: false, message: 'This slot is allready Booked!' })
      }
      else {
        slots_booked[slotDate].push(slotTime)
      }
    }
    else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')
    delete docData.slots_booked

    const appointmentData = {
      docId, userId, slotTime, slotDate, docData, userData, ammount: docData.fees
    }
    const newAppointment = new appointmentModel(appointmentData)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    await newAppointment.save()
    res.json({ success: true, message: 'Appointment Booked ' })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })

  }
}

const getAllAppointments = async (req, res) => {
  try {
    const userId = req.userId
    const appointments = await appointmentModel.find({ userId })
    if (appointments.length == 0) {
      return res.json({ success: false, message: 'No appointment booked by this user' })
    }
    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }


}
const cancelappointment = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const userId = req.userId
    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unautherise User' })
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { canclled: true })


    //releasing slot 
    const { docId, slotDate, slotTime } = appointmentData

    const docData = await doctorModel.findById(docId)
    const slots_booked = docData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.json({ success: true, message: 'Appointment Cancled' })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
// api for payment of appointments 

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})
const paymentApi = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.canclled) {
      return res.json({ success: false, message: "Appointment canclled or not found!" })
    }
    // options for razorpay

    const options = {
      amount: appointmentData.ammount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId
    }

    //creation of an ordrer

    const order = await razorpayInstance.orders.create(options)
    res.json({ success: true, order })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// verify payment 

const verifyRazorpay = async (req, res) => {

  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:"Payment Successful"})
    }
    else{
      res.json({success:false,message:'Payment Failed'})
    }
  } catch (error) {
  
    console.log('in vrify' + error.message)
    res.json({ success: false, message: error.message })
  }
}

export { registerUser, userLogin, getUser, updateUser, bookAppointment, getAllAppointments, cancelappointment, paymentApi, verifyRazorpay }