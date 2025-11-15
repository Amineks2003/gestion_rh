import mongoose from "mongoose";
import User from "./config/models/userModel.js";
import Employee from "./config/models/employeeModel.js";
import Performance from "./config/models/performanceModel.js";

// 🔹 Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/rh_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connecté ✔"))
.catch(err => console.error("Erreur de connexion MongoDB :", err));

async function clearData() {
  try {
    await Performance.deleteMany({});
    console.log("✅ Collection performances vidée");

    await Employee.deleteMany({});
    console.log("✅ Collection employees vidée");

    await User.deleteMany({});
    console.log("✅ Collection users vidée");

    console.log("Toutes les tables ont été vidées avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur lors du vidage des tables :", err);
    process.exit(1);
  }
}

clearData();
