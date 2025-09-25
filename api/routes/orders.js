const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  cancelOrder,
  getOrderStats
} = require('../controllers/orderController');

const {
  validateOrder,
  validateOrderId
} = require('../middleware/validation');

const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.post('/', validateOrder, createOrder);
router.get('/', getOrders);
router.get('/stats', restrictTo('admin'), getOrderStats);
router.get('/:id', validateOrderId, getOrder);
router.put('/:id', restrictTo('admin'), validateOrderId, updateOrder);
router.patch('/:id/cancel', validateOrderId, cancelOrder);

module.exports = router;