import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  docId:{ type:String,require:true},
  userId:{ type:String,require:true},
  docData:{type:Object,require:true},
  userData:{type:Object,require:true},
  ammount:{type:Number,require:true},
  slotTime:{type:String,require:true},
  slotDate:{type:String,require:true},
  date:{type:Number,require:true},
  canclled:{type:Boolean,default:false},
  isComplete:{type:Boolean,default:false},
  payment:{type:Boolean,default:false}

})

const appointmentModel=   mongoose.models.appointment  ||mongoose.model('appointment',appointmentSchema)
export default appointmentModel