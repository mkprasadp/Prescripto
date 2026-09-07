import mongoose from 'mongoose'

const connectDB= async ()=>{
  try {
    mongoose.connection.on('connected',()=>console.log('DataBase connected'))
  await mongoose.connect(`${process.env.MONGODB_URL}/doctoron`)
  } catch (error) {
    console.error('Error connecting to MongoDB:');
  }
}

export default connectDB