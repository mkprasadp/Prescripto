import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    image:{type:String,require:true},
    speciality:{type:String, required:true},
    degree:{type:String, required:true},
    experience:{type:Number, required:true},
    about:{type:String, required:true},
    avaliable:{type:Boolean, required:true},
    address:{type:Object, required:true},
    date:{type:Number, required:true},
    slots_booked:{type:Object, default:{}}
},{minimize:false});

const doctorModel = mongoose.model('doctors', doctorSchema);

export default doctorModel;