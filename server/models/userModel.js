import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Auth & verification
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },

  // Role: toujours admin
  role: { type: String, enum: ["admin"], default: "admin" },

  // Profil complet
  salary: { type: Number, default: 0 },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  hireDate: { type: Date, default: Date.now },

}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel;
