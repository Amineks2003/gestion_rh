import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// ---------------- Register ----------------
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, salary, hireDate, position } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      address: address || "",
      salary: salary || 0,
      hireDate: hireDate ? new Date(hireDate) : Date.now(),
      department: "HR", // fixe
      position: position || "",
    });

    // Générer token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).json({ success: true, message: 'User created successfully', token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Login ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Email or password incorrect' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Email or password incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Logout ----------------
export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logout successful' });
};

// ---------------- Is Authenticated ----------------
export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

// ---------------- Send Verification OTP ----------------
export const sendVerifyOtp = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // userAuth ajoute req.user
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Verification Code',
      text: `Your verification code is: ${otp}`,
    });

    res.json({ success: true, message: 'Verification code sent by email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Verify Email ----------------
export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ success: false, message: 'Code invalid or expired' });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Send Reset OTP ----------------
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Reset Code',
      text: `Your reset code is: ${otp}`,
    });

    res.json({ success: true, message: 'Reset code sent by email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Reset Password ----------------
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
      return res.status(400).json({ success: false, message: 'Code invalid or expired' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
