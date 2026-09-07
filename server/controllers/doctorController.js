import doctorModel from '../models/doctorModel.js';

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    console.log("Received docId:", docId);

    const doctorData = await doctorModel.findById(docId);
    
    if (!doctorData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    doctorData.available = !doctorData.available;
    await doctorData.save();

    res.json({ success: true, message: 'Availability changed!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorsList= async (req,res)=>{
try {
  const doctors= await doctorModel.find({}).select(['-password','-email'])
  res.json({success:true,doctors})
  
} catch (error) {
  res.json({success:false,message:error.message})
}

}

export  {changeAvailablity,doctorsList};
