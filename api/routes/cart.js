const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon
} = require('../controllers/cartController');

const {
  validateCartItem,
  validateCartItemId
} = require('../middleware/validation');

const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// All cart routes require authentication (or optional for guest carts)
router.use(optionalAuth);

router.get('/', protect, getCart);
router.post('/items', protect, validateCartItem, addToCart);
router.put('/items/:id', protect, validateCartItemId, updateCartItem);
router.delete('/items/:id', protect, validateCartItemId, removeFromCart);
router.delete('/', protect, clearCart);
router.post('/coupon', protect, applyCoupon);
router.delete('/coupon', protect, removeCoupon);

module.exports = router;