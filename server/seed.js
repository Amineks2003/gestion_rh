import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Employee from "./models/employeeModel.js";
import Performance from "./models/performanceModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rh_management";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // 1️⃣ Clear existing data
    await User.deleteMany();
    await Employee.deleteMany();
    await Performance.deleteMany();

    // 2️⃣ Create 6 users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@test.com", password: "123456" },
      { name: "Bob", email: "bob@test.com", password: "123456" },
      { name: "Charlie", email: "charlie@test.com", password: "123456" },
      { name: "David", email: "david@test.com", password: "123456" },
      { name: "Eve", email: "eve@test.com", password: "123456" },
      { name: "Frank", email: "frank@test.com", password: "123456" },
    ]);

    // 3️⃣ Create 6 employees linked to users
    const employees = await Employee.insertMany([
      { user: users[0]._id, department: "HR", position: "Manager", phone: "123456", salary: 5000 },
      { user: users[1]._id, department: "IT", position: "Developer", phone: "234567", salary: 4000 },
      { user: users[2]._id, department: "Sales", position: "Sales Rep", phone: "345678", salary: 3500 },
      { user: users[3]._id, department: "Finance", position: "Accountant", phone: "456789", salary: 4500 },
      { user: users[4]._id, department: "Marketing", position: "Marketer", phone: "567890", salary: 4200 },
      { user: users[5]._id, department: "Support", position: "Support Agent", phone: "678901", salary: 3800 },
    ]);

    // 4️⃣ Create 8 performances
    await Performance.insertMany([
      {
        employee: employees[0]._id,
        evaluatedBy: users[1]._id,
        period: "Q1 2025",
        objectives: [
          { title: "Recruit 2 new members", description: "Hire efficiently", status: "Achieved" },
          { title: "Organize training", description: "Train new hires", status: "In Progress" },
        ],
        scores: [
          { criteria: "Effectiveness", score: 8 },
          { criteria: "Timeliness", score: 9 },
        ],
        overallRating: 8.5,
        feedback: "Good HR management",
      },
      {
        employee: employees[1]._id,
        evaluatedBy: users[0]._id,
        period: "Q1 2025",
        objectives: [
          { title: "Develop Feature A", description: "Complete module", status: "Achieved" },
        ],
        scores: [
          { criteria: "Quality", score: 9 },
          { criteria: "Efficiency", score: 8 },
        ],
        overallRating: 8.5,
        feedback: "Great coding work",
      },
      {
        employee: employees[2]._id,
        evaluatedBy: users[0]._id,
        period: "Q1 2025",
        objectives: [
          { title: "Reach sales target", description: "Achieve monthly goal", status: "In Progress" },
        ],
        scores: [
          { criteria: "Sales", score: 7 },
          { criteria: "Client follow-up", score: 8 },
        ],
        overallRating: 7.5,
        feedback: "Needs improvement in follow-ups",
      },
      {
        employee: employees[3]._id,
        evaluatedBy: users[1]._id,
        period: "Q1 2025",
        objectives: [
          { title: "Prepare financial report", description: "Monthly report accuracy", status: "Achieved" },
        ],
        scores: [
          { criteria: "Accuracy", score: 9 },
          { criteria: "Timeliness", score: 8 },
        ],
        overallRating: 8.5,
        feedback: "Excellent finance work",
      },
      {
        employee: employees[4]._id,
        evaluatedBy: users[0]._id,
        period: "Q2 2025",
        objectives: [
          { title: "Launch campaign", description: "Marketing campaign success", status: "In Progress" },
        ],
        scores: [
          { criteria: "Creativity", score: 8 },
          { criteria: "Reach", score: 7 },
        ],
        overallRating: 7.5,
        feedback: "Good start",
      },
      {
        employee: employees[5]._id,
        evaluatedBy: users[1]._id,
        period: "Q2 2025",
        objectives: [
          { title: "Resolve support tickets", description: "Customer satisfaction", status: "Achieved" },
        ],
        scores: [
          { criteria: "Speed", score: 9 },
          { criteria: "Accuracy", score: 9 },
        ],
        overallRating: 9,
        feedback: "Excellent support",
      },
      {
        employee: employees[0]._id,
        evaluatedBy: users[2]._id,
        period: "Q2 2025",
        objectives: [
          { title: "Organize team event", description: "HR team bonding", status: "Not Achieved" },
        ],
        scores: [
          { criteria: "Organization", score: 8 },
        ],
        overallRating: 8,
        feedback: "Looking forward to it",
      },
      {
        employee: employees[1]._id,
        evaluatedBy: users[2]._id,
        period: "Q2 2025",
        objectives: [
          { title: "Implement CI/CD", description: "Automate deployment", status: "In Progress" },
        ],
        scores: [
          { criteria: "Efficiency", score: 7 },
          { criteria: "Reliability", score: 8 },
        ],
        overallRating: 7.5,
        feedback: "Keep improving",
      },
    ]);

    console.log("✅ Database seeded successfully with 6 employees and 8 performances");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedData);
