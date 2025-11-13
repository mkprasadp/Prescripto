

const addDoctor = async(req, res)=>{
    try {
        const { name,email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imagefile = req.file;
        console.log(imagefile);
    } catch (error) {
        console.log("Error in adding doctor");
    }
}


export {addDoctor};