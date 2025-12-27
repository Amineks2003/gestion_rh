import mongoose from "mongoose";
import dotenv from "dotenv";
import Employee from "./models/employeeModel.js";
import Performance from "./models/performanceModel.js";
import Announcement from "./models/announcementModel.js";
import Leave from "./models/leaveModel.js"; // <-- Import Leave model
import User from "./models/userModel.js"; // juste pour créer un admin

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
    await Employee.deleteMany();
    await Performance.deleteMany();
    await Announcement.deleteMany();
    await Leave.deleteMany(); // <-- Clear leaves
    console.log("🧹 Old data removed");

    // 2️⃣ Create admin user if not exists
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email: "admin@test.com",
        password: "admin123",
        role: "admin",
      });
      console.log("👤 Admin user created");
    } else {
      console.log("👤 Admin user found:", admin.name);
    }

    // 3️⃣ Create Employees
    const employees = await Employee.insertMany([
      { name: "Alice Johnson", email: "alice.johnson@test.com", department: "HR", position: "Manager", phone: "11111111", salary: 5000 },
      { name: "Bob Smith", email: "bob.smith@test.com", department: "IT", position: "Developer", phone: "22222222", salary: 4500 },
      { name: "Charlie Brown", email: "charlie.brown@test.com", department: "Finance", position: "Accountant", phone: "33333333", salary: 4300 },
      { name: "Diana Prince", email: "diana.prince@test.com", department: "Marketing", position: "Marketer", phone: "44444444", salary: 4200 },
      { name: "Ethan Hunt", email: "ethan.hunt@test.com", department: "Support", position: "Support Agent", phone: "55555555", salary: 3800 },
    ]);
    console.log("👨‍💼 5 Employees created");

    // 4️⃣ Create Performances
    const performancesData = [
      { employee: employees[0]._id, evaluatedBy: admin._id, period: "Q1 2025", overallRating: 8.5, feedback: "Great management" },
      { employee: employees[1]._id, evaluatedBy: admin._id, period: "Q1 2025", overallRating: 9, feedback: "Excellent developer" },
      { employee: employees[2]._id, evaluatedBy: admin._id, period: "Q1 2025", overallRating: 8, feedback: "Good finance work" },
      { employee: employees[3]._id, evaluatedBy: admin._id, period: "Q1 2025", overallRating: 7.5, feedback: "Creative marketing" },
      { employee: employees[4]._id, evaluatedBy: admin._id, period: "Q1 2025", overallRating: 9.2, feedback: "Amazing customer support" },
    ];
    await Performance.insertMany(performancesData);
    console.log("📊 5 Performances created");

    // 5️⃣ Create Announcements
    const announcementsData = [
      { title: "Holiday Notice", content: "Office closed Friday", createdBy: admin._id },
      { title: "New Policy", content: "Updated HR policies", createdBy: admin._id },
      { title: "Team Event", content: "Team building next week", createdBy: admin._id },
      { title: "Reminder", content: "Submit monthly reports", createdBy: admin._id },
      { title: "Office Renovation", content: "Renovation starts next month", createdBy: admin._id },
    ];
    await Announcement.insertMany(announcementsData);
    console.log("📢 5 Announcements created");

    // 6️⃣ Create Leaves (1 pour chaque employé)
    const leavesData = [
      { employee: employees[0]._id, leaveType: "Sick Leave", startDate: new Date("2025-01-10"), endDate: new Date("2025-01-12"), reason: "Flu", status: "Pending" },
      { employee: employees[1]._id, leaveType: "Casual Leave", startDate: new Date("2025-02-05"), endDate: new Date("2025-02-06"), reason: "Family function", status: "Pending" },
      { employee: employees[2]._id, leaveType: "Earned Leave", startDate: new Date("2025-03-01"), endDate: new Date("2025-03-03"), reason: "Vacation", status: "Pending" },
      { employee: employees[3]._id, leaveType: "Unpaid Leave", startDate: new Date("2025-04-15"), endDate: new Date("2025-04-16"), reason: "Personal work", status: "Pending" },
      { employee: employees[4]._id, leaveType: "Casual Leave", startDate: new Date("2025-05-20"), endDate: new Date("2025-05-20"), reason: "Errands", status: "Pending" },
    ];
    await Leave.insertMany(leavesData);
    console.log("📝 5 Leaves created");

    console.log("🎉 Database Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedData);
