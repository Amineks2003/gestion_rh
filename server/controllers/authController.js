// controllers/authController.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure nodemailer (SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ---------------- Register ----------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Utilisateur déjà existant' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, message: 'Utilisateur créé avec succès', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Login ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });

    // Générer token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: 'Connexion réussie', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Logout ----------------
export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Déconnexion réussie' });
};

// ---------------- Is Authenticated ----------------
export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Non authentifié' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'Utilisateur non trouvé' });

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
  }
};

// ---------------- Send Verification OTP ----------------
export const sendVerifyOtp = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Code de vérification',
      text: `Votre code de vérification est : ${otp}`
    });

    res.json({ success: true, message: 'Code de vérification envoyé par email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Verify Email ----------------
export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });

    if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpiry) {
      return res.status(400).json({ success: false, message: 'Code invalide ou expiré' });
    }

    user.isAccountVerified = true;
    user.verifyOtp = null;
    user.verifyOtpExpiry = null;
    await user.save();

    res.json({ success: true, message: 'Email vérifié avec succès' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Send Reset OTP ----------------
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Code de réinitialisation',
      text: `Votre code de réinitialisation est : ${otp}`
    });

    res.json({ success: true, message: 'Code de réinitialisation envoyé par email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Reset Password ----------------
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });

    if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({ success: false, message: 'Code invalide ou expiré' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    res.json({ success: true, message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
