const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const ResponseAPI = require('../utils/response');

// Konfigurasi transporter untuk mengirim email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email pengirim
    pass: process.env.EMAIL_PASS, // Password email
  },
});

// Generate OTP (6-digit angka acak)
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const authController = {
  // Request OTP untuk reset password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) return ResponseAPI.error(res, 'Email is required', 400);

      const user = await User.findOne({ email });
      if (!user) return ResponseAPI.error(res, 'Email not found', 404);

      const otp = generateOTP();
      user.resetOTP = otp;
      user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP berlaku 5 menit
      await user.save();

      // Kirim email OTP
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP is: ${otp}`,
      }, (err, info) => {
        if (err) {
          console.error("Email Error:", err);
          return ResponseAPI.serverError(res, err);
        } else {
          console.log("Email Sent:", info.response);
          ResponseAPI.success(res, { message: 'OTP sent to your email' });
        }
      });

      ResponseAPI.success(res, { message: 'OTP sent to your email' });
    } catch (error) {
      console.error("Email Error:", err);
      ResponseAPI.serverError(res, error);
    }
  },

  // Verifikasi OTP untuk reset password
  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) return ResponseAPI.error(res, 'Email and OTP are required', 400);

      const user = await User.findOne({ email });
      if (!user || user.resetOTP !== otp || user.otpExpires < Date.now()) {
        return ResponseAPI.error(res, 'Invalid or expired OTP', 400);
      }

      user.resetOTP = null;
      user.otpExpires = null;
      await user.save();

      ResponseAPI.success(res, { message: 'OTP verified. You can reset your password now.' });
    } catch (error) {
      ResponseAPI.serverError(res, error);
    }
  },

  // Reset password setelah verifikasi OTP
  async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) return ResponseAPI.error(res, 'Email and new password are required', 400);

      const user = await User.findOne({ email });
      if (!user) return ResponseAPI.error(res, 'User not found', 404);

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      ResponseAPI.success(res, { message: 'Password reset successfully' });
    } catch (error) {
      ResponseAPI.serverError(res, error);
    }
  },
};

module.exports = authController;
