import { v2 as cloudinary } from 'cloudinary';

const connectCloud = async()=>{
    try {  
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        })
        console.log("Cloudinary connected successfully");
    } catch (error) {
        console.error("Cloudinary Not connected");
    }
}

export default connectCloud;