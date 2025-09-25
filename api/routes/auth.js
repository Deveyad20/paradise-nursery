const express = require('express');
const {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
} = require('../controllers/authController');

const {
  validateRegister,
  validateLogin,
  validatePasswordReset,
  validateForgotPassword
} = require('../middleware/validation');

const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validatePasswordReset, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', optionalAuth, resendVerification);

// Protected routes
router.post('/logout', logout);

module.exports = router;