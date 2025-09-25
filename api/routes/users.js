const express = require('express');
const {
  getProfile,
  updateProfile,
  changePassword,
  getUserOrders,
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} = require('../controllers/userController');

const {
  validateProfileUpdate,
  validateAddress
} = require('../middleware/validation');

const { protect, checkOwnership } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', validateProfileUpdate, updateProfile);
router.put('/change-password', changePassword);
router.get('/orders', getUserOrders);
router.get('/addresses', getUserAddresses);
router.post('/addresses', validateAddress, addAddress);
router.put('/addresses/:id', validateAddress, updateAddress);
router.delete('/addresses/:id', deleteAddress);
router.patch('/addresses/:id/default', setDefaultAddress);

module.exports = router;