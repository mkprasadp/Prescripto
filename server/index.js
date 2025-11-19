import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './src/Config/db.js';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

await connectDB();

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

export default app;