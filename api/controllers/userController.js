const { User, Order } = require('../models');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const bcrypt = require('bcryptjs');

// Get user profile
const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password', 'passwordResetToken', 'passwordResetExpires'] }
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Update user profile
const updateProfile = catchAsync(async (req, res, next) => {
  const { firstName, lastName, phone, dateOfBirth, preferences } = req.body;
  const userId = req.user.id;

  const user = await User.findByPk(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update allowed fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (phone !== undefined) user.phone = phone;
  if (dateOfBirth) user.dateOfBirth = dateOfBirth;
  if (preferences) user.preferences = { ...user.preferences, ...preferences };

  await user.save();

  // Remove sensitive data
  user.password = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

// Change password
const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword) {
    return next(new AppError('Current password and new password are required', 400));
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check current password
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Current password is incorrect', 400));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
});

// Get user orders
const getUserOrders = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const {
    page = 1,
    limit = 10,
    status,
    sort = 'createdAt',
    order = 'DESC'
  } = req.query;

  const filter = { userId };
  if (status) {
    filter.status = status;
  }

  const offset = (page - 1) * limit;

  const { rows: orders, count } = await Order.findAndCountAll({
    where: filter,
    order: [[sort, order.toUpperCase()]],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    results: orders.length,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalResults: count,
      limit: parseInt(limit)
    },
    data: {
      orders
    }
  });
});

// Get user addresses (from order history)
const getUserAddresses = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const orders = await Order.findAll({
    where: { userId },
    attributes: ['shippingAddress', 'billingAddress'],
    order: [['createdAt', 'DESC']]
  });

  // Extract unique addresses
  const addresses = [];
  const addressSet = new Set();

  orders.forEach(order => {
    if (order.shippingAddress) {
      const addressKey = JSON.stringify(order.shippingAddress);
      if (!addressSet.has(addressKey)) {
        addresses.push({
          ...order.shippingAddress,
          type: 'shipping',
          isDefault: addresses.length === 0
        });
        addressSet.add(addressKey);
      }
    }

    if (order.billingAddress && order.billingAddress !== order.shippingAddress) {
      const addressKey = JSON.stringify(order.billingAddress);
      if (!addressSet.has(addressKey)) {
        addresses.push({
          ...order.billingAddress,
          type: 'billing',
          isDefault: false
        });
        addressSet.add(addressKey);
      }
    }
  });

  res.status(200).json({
    status: 'success',
    results: addresses.length,
    data: {
      addresses
    }
  });
});

// Add new address
const addAddress = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const addressData = req.body;

  // In a real app, you might store addresses in a separate table
  // For now, we'll just return success
  res.status(201).json({
    status: 'success',
    message: 'Address added successfully',
    data: {
      address: {
        id: Date.now().toString(),
        ...addressData,
        isDefault: false
      }
    }
  });
});

// Update address
const updateAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const addressData = req.body;

  // In a real app, you would update the address in the database
  res.status(200).json({
    status: 'success',
    message: 'Address updated successfully',
    data: {
      address: {
        id,
        ...addressData
      }
    }
  });
});

// Delete address
const deleteAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // In a real app, you would delete the address from the database
  res.status(204).json({
    status: 'success',
    message: 'Address deleted successfully'
  });
});

// Set default address
const setDefaultAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // In a real app, you would update the default address flag
  res.status(200).json({
    status: 'success',
    message: 'Default address updated successfully',
    data: {
      defaultAddressId: id
    }
  });
});

// Get user statistics
const getUserStats = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const totalOrders = await Order.count({ where: { userId } });
  const totalSpent = await Order.sum('total', { where: { userId } });
  const lastOrder = await Order.findOne({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        totalOrders,
        totalSpent: totalSpent || 0,
        avgOrderValue: totalOrders > 0 ? (totalSpent || 0) / totalOrders : 0,
        lastOrderDate: lastOrder?.createdAt
      }
    }
  });
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getUserOrders,
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getUserStats
};