import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
const app = express();

const PORT = process.env.PORT || 5000

connectDB()
connectCloudinary()
// MiddleWare 

app.use(express.json())      // Parse JSON body
app.use(cors())             // enable CORS for all routes and origins /access backend from any endpoint

// API endpoint
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res)=>{
    res.send("API Working")
})

app.listen(PORT, ()=>{
    console.log(`Connection at Port ${PORT}`);
})