const express = require('express');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts
} = require('../controllers/productController');

const {
  validateProduct,
  validateProductId,
  validateProductQuery
} = require('../middleware/validation');

const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', validateProductQuery, getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/search', searchProducts);
router.get('/:id', validateProductId, getProduct);

// Protected routes (admin only)
router.post('/', protect, restrictTo('admin'), validateProduct, createProduct);
router.put('/:id', protect, restrictTo('admin'), validateProductId, validateProduct, updateProduct);
router.delete('/:id', protect, restrictTo('admin'), validateProductId, deleteProduct);

module.exports = router;