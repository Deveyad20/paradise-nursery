const { Product, User, sequelize } = require('../models');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

// Get all products with filtering and pagination
const getAllProducts = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 12,
    category,
    careLevel,
    minPrice,
    maxPrice,
    search,
    sort = 'createdAt',
    order = 'DESC'
  } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (category) {
    filter.category = category;
  }

  if (careLevel) {
    filter.careLevel = careLevel;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price[Op.gte] = minPrice;
    if (maxPrice) filter.price[Op.lte] = maxPrice;
  }

  if (search) {
    filter[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
      { tags: { [Op.overlap]: [search] } }
    ];
  }

  // Calculate offset
  const offset = (page - 1) * limit;

  // Get products
  const { rows: products, count } = await Product.findAndCountAll({
    where: filter,
    order: [[sort, order.toUpperCase()]],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  // Calculate pagination info
  const totalPages = Math.ceil(count / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  res.status(200).json({
    status: 'success',
    results: products.length,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalResults: count,
      hasNext,
      hasPrev,
      limit: parseInt(limit)
    },
    data: {
      products
    }
  });
});

// Get single product
const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product || !product.isActive) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

// Create new product
const createProduct = catchAsync(async (req, res, next) => {
  const productData = {
    ...req.body,
    createdBy: req.user.id
  };

  const product = await Product.create(productData);

  res.status(201).json({
    status: 'success',
    message: 'Product created successfully',
    data: {
      product
    }
  });
});

// Update product
const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Update product
  Object.assign(product, req.body);
  await product.save();

  res.status(200).json({
    status: 'success',
    message: 'Product updated successfully',
    data: {
      product
    }
  });
});

// Delete product (soft delete)
const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Soft delete
  product.isActive = false;
  await product.save();

  res.status(204).json({
    status: 'success',
    message: 'Product deleted successfully'
  });
});

// Get products by category
const getProductsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 12 } = req.query;

  const offset = (page - 1) * limit;

  const { rows: products, count } = await Product.findAndCountAll({
    where: {
      category,
      isActive: true
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']]
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    results: products.length,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalResults: count,
      limit: parseInt(limit)
    },
    data: {
      products,
      category
    }
  });
});

// Search products
const searchProducts = catchAsync(async (req, res, next) => {
  const { q, page = 1, limit = 12 } = req.query;

  if (!q) {
    return next(new AppError('Search query is required', 400));
  }

  const offset = (page - 1) * limit;

  const { rows: products, count } = await Product.findAndCountAll({
    where: {
      isActive: true,
      [Op.or]: [
        { name: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
        { shortDescription: { [Op.iLike]: `%${q}%` } },
        { tags: { [Op.overlap]: [q] } }
      ]
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [
      // Prioritize exact matches in name
      [sequelize.literal(`CASE WHEN name ILIKE '%${q}%' THEN 1 ELSE 2 END`)],
      ['name', 'ASC']
    ]
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    results: products.length,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalResults: count,
      limit: parseInt(limit)
    },
    data: {
      products,
      searchQuery: q
    }
  });
});

// Get featured products
const getFeaturedProducts = catchAsync(async (req, res, next) => {
  const { limit = 8 } = req.query;

  const products = await Product.findAll({
    where: {
      isActive: true,
      isFeatured: true
    },
    limit: parseInt(limit),
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});

// Get product statistics (admin only)
const getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.findAll({
    attributes: [
      'category',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice'],
      [sequelize.fn('MIN', sequelize.col('price')), 'minPrice'],
      [sequelize.fn('MAX', sequelize.col('price')), 'maxPrice']
    ],
    where: { isActive: true },
    group: ['category'],
    raw: true
  });

  const totalProducts = await Product.count({ where: { isActive: true } });
  const lowStockProducts = await Product.count({
    where: {
      isActive: true,
      stock: { [Op.lte]: sequelize.col('minStockLevel') }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      stats,
      summary: {
        totalProducts,
        lowStockProducts
      }
    }
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getProductStats
};