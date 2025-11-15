import express from "express";
import cors from "cors";
import dotenv from 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import performanceRoutes from "./routes/performanceRoutes.js";


const app =express();
const port =process.env.PORT || 3000
connectDB();


const allowedOrigins=['http://localhost:3001']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))

//API Endpoints
app.get('/',(req,res)=>res.send("API working fine"));
app.use('/api/auth',authRouter)
//app.use('/api/user', userRouter)
app.use("/api/performance", performanceRoutes);



app.listen(port,()=> console.log(`server started on PORT:${port}`));

