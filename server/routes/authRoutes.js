import express from 'express';
import {
  login,
  logout,
  register,
  verifyEmail,
  sendVerifyOtp,
  isAuthenticated,
  resetPassword,
  sendResetOtp
} from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';

const authRouter = express.Router();

// PUBLIC ROUTES
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

// PROTECTED ROUTES
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);

export default authRouter;
