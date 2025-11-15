import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./config/models/userModel.js";
import Employee from "./config/models/employeeModel.js";
import Performance from "./config/models/performanceModel.js";

// 🔹 Connexion MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/rh_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connecté ✔"))
.catch(err => console.error("Erreur de connexion MongoDB :", err));

async function populateData() {
  try {
    // ⚡ Vider les collections
    await Performance.deleteMany({});
    await Employee.deleteMany({});
    await User.deleteMany({});
    console.log("Collections vidées ✅");

    // 🔹 Créer Users (3 employees + 1 HR)
    const users = await Promise.all([
      User.create({ name: "John Doe", email: "john@example.com", password: await bcrypt.hash("password123", 10), role: "employee" }),
      User.create({ name: "Jane Smith", email: "jane@example.com", password: await bcrypt.hash("password123", 10), role: "employee" }),
      User.create({ name: "Bob Johnson", email: "bob@example.com", password: await bcrypt.hash("password123", 10), role: "employee" }),
      User.create({ name: "Alice HR", email: "alice.hr@example.com", password: await bcrypt.hash("password123", 10), role: "admin" }),
    ]);

    const [johnUser, janeUser, bobUser, hrUser] = users;

    // 🔹 Créer Employees
    const employees = await Promise.all([
      Employee.create({ user: johnUser._id, department: "IT", position: "Developer", phone: "11111111", address: "Rue A", salary: 50000 }),
      Employee.create({ user: janeUser._id, department: "Marketing", position: "Marketing Specialist", phone: "22222222", address: "Rue B", salary: 45000 }),
      Employee.create({ user: bobUser._id, department: "Finance", position: "Accountant", phone: "33333333", address: "Rue C", salary: 48000 }),
    ]);

    const [john, jane, bob] = employees;

    // 🔹 Créer Performances
    const performancesData = [
      {
        employee: john._id,
        evaluatedBy: hrUser._id,
        period: "Q1 2025",
        objectives: [
          { title: "Project Alpha", description: "Complete Alpha module", status: "Achieved" },
          { title: "Improve Docs", description: "Document all APIs", status: "In Progress" },
        ],
        scores: [
          { criteria: "Quality", score: 9 },
          { criteria: "Punctuality", score: 8 },
        ],
        overallRating: 8.5,
        feedback: "Excellent work on Project Alpha.",
      },
      {
        employee: john._id,
        evaluatedBy: hrUser._id,
        period: "Q2 2025",
        objectives: [
          { title: "Project Beta", description: "Develop Beta features", status: "In Progress" },
        ],
        scores: [
          { criteria: "Quality", score: 8 },
          { criteria: "Punctuality", score: 9 },
        ],
        overallRating: 8.5,
        feedback: "Keep focus on Beta project.",
      },
      {
        employee: jane._id,
        evaluatedBy: hrUser._id,
        period: "Q1 2025",
        objectives: [
          { title: "Social Media Campaign", description: "Launch Instagram campaign", status: "Achieved" },
          { title: "Newsletter", description: "Send monthly newsletter", status: "Achieved" },
        ],
        scores: [
          { criteria: "Creativity", score: 9 },
          { criteria: "Timeliness", score: 9 },
        ],
        overallRating: 9,
        feedback: "Great job with campaigns!",
      },
      {
        employee: bob._id,
        evaluatedBy: hrUser._id,
        period: "Q1 2025",
        objectives: [
          { title: "Monthly Reports", description: "Prepare accurate reports", status: "Achieved" },
          { title: "Budget Forecast", description: "Prepare Q2 forecast", status: "In Progress" },
        ],
        scores: [
          { criteria: "Accuracy", score: 10 },
          { criteria: "Deadlines", score: 7 },
        ],
        overallRating: 8.5,
        feedback: "Good work, improve deadline management.",
      },
    ];

    const performances = await Performance.insertMany(performancesData);

    console.log("Data populated avec succès ✅");
    console.log({ users, employees, performances });

    process.exit(0);
  } catch (err) {
    console.error("Erreur lors de la création des données :", err);
    process.exit(1);
  }
}

populateData();
