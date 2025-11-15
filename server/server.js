import express from "express";
import cors from "cors";
import dotenv from 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import performanceRoutes from "./routes/performanceRoutes.js";
import employeeRoutes from './routes/employeeRoutes.js'




const app =express();
const port =process.env.PORT || 3000

// Only attempt DB connection if MONGO_URI is set (avoid crashing in dev when env not configured)
if (process.env.MONGO_URI) {
	connectDB();
} else {
	console.warn('⚠️  MONGO_URI not set - skipping DB connection (dev mode)');
}


const allowedOrigins=['http://localhost:5173']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))

//API Endpoints
app.get('/',(req,res)=>res.send("API working fine"));
app.use('/api/auth',authRouter)
// enable user routes (get user data)
import userRouter from './routes/userRoutes.js';
app.use('/api/user', userRouter);
app.use("/api/performance", performanceRoutes);
app.use('/api/employees', employeeRoutes);



app.listen(port,()=> console.log(`server started on PORT:${port}`));

