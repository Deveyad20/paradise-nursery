const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../models');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const { createSendToken } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

// Register new user
const register = catchAsync(async (req, res, next) => {
  const { email, password, firstName, lastName, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 400));
  }

  // Create verification token
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    phone,
    emailVerificationToken: crypto
      .createHash('sha256')
      .update(emailVerificationToken)
      .digest('hex')
  });

  // Send verification email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Verify Your Paradise Nursery Account',
      template: 'emailVerification',
      data: {
        name: user.firstName,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`
      }
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't fail registration if email fails
  }

  // Send token response
  createSendToken(user, 201, res, 'User registered successfully');
});

// Login user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Find user and include password
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Send token response
  createSendToken(user, 200, res, 'Login successful');
});

// Logout user
const logout = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Logout successful'
  });
});

// Refresh access token
const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // Generate new access token
    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      status: 'success',
      token: newToken
    });
  } catch (error) {
    return next(new AppError('Invalid refresh token', 401));
  }
});

// Forgot password
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new AppError('No user found with this email address', 404));
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set reset token and expiry
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // Send reset email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset - Paradise Nursery',
      template: 'passwordReset',
      data: {
        name: user.firstName,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to your email'
    });
  } catch (error) {
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return next(new AppError('Error sending email. Please try again later.', 500));
  }
});

// Reset password
const resetPassword = catchAsync(async (req, res, next) => {
  const { token, password } = req.body;

  // Hash token to compare with database
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find user with valid reset token
  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [require('sequelize').Op.gt]: Date.now() }
    }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // Set new password
  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  // Send confirmation email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Changed Successfully',
      template: 'passwordChanged',
      data: {
        name: user.firstName
      }
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }

  // Send token response
  createSendToken(user, 200, res, 'Password reset successful');
});

// Verify email
const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    where: {
      emailVerificationToken: hashedToken
    }
  });

  if (!user) {
    return next(new AppError('Invalid verification token', 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully'
  });
});

// Resend verification email
const resendVerification = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new AppError('Please log in to resend verification email', 401));
  }

  if (user.isEmailVerified) {
    return next(new AppError('Email is already verified', 400));
  }

  // Generate new verification token
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');

  user.emailVerificationToken = crypto
    .createHash('sha256')
    .update(emailVerificationToken)
    .digest('hex');

  await user.save();

  // Send verification email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Verify Your Paradise Nursery Account',
      template: 'emailVerification',
      data: {
        name: user.firstName,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    return next(new AppError('Error sending email. Please try again later.', 500));
  }
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
};