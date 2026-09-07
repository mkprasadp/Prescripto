import express from 'express'
import {doctorsList} from '../controllers/doctorController.js'

const docRouter= express.Router()

docRouter.get('/list',doctorsList)
export default docRouter