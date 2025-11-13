import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/Config/db.js';
import connectCloud from './src/Config/Cloudinary.js';
import adminRoutes from './src/Routes/adminRoutes.js';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());


app.use('/api/admin',adminRoutes)

await connectDB();
await connectCloud();

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})