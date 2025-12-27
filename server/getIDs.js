import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rh_management")
  .then(async () => {
    console.log("✅ Connected. Fetching users...");
    
    // Get all users
    const users = await User.find({});
    
    console.log("\n--- USER LIST ---");
    users.forEach(u => {
      console.log(`Name: ${u.name} | ID: ${u._id}`);
    });
    console.log("-----------------\n");
    
    process.exit();
  })
  .catch(err => console.error(err));