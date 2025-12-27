import express from "express";
import cors from "cors";
import dotenv from 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import performanceRoutes from "./routes/performanceRoutes.js";
import employeeRoutes from './routes/employeeRoutes.js'
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRouter from './routes/userRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
<<<<<<< HEAD
import 'dotenv/config';
=======
import profileRoutes from './routes/profileRoutes.js';
>>>>>>> bc3def928bda518453df4f23940bdb9ed70a1c53

const app =express();
const port =process.env.PORT || 3000

// Only attempt DB connection if MONGO_URI is set (avoid crashing in dev when env not configured)
if (process.env.MONGO_URI) {
	connectDB();
} else {
	console.warn('⚠️  MONGO_URI not set - skipping DB connection (dev mode)');
}


const allowedOrigins=['http://localhost:5173'];


app.get('/',(req,res)=>res.send("API working fine"));

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))

app.use('/api/auth',authRouter)
app.use('/api/user', userRouter);
app.use("/api/performance", performanceRoutes);
app.use('/api/employees', employeeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/profile', profileRoutes);

app.listen(port,()=> console.log(`server started on PORT:${port}`));

