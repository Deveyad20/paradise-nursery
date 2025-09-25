const { Order, Cart, Product, User, sequelize } = require('../models');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const { Op } = require('sequelize');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create new order
const createOrder = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const {
    items,
    shippingAddress,
    billingAddress,
    paymentMethod,
    customerNotes,
    couponCode
  } = req.body;

  // Validate items
  if (!items || items.length === 0) {
    return next(new AppError('Order must contain at least one item', 400));
  }

  // Get user's cart to validate items
  const cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    return next(new AppError('No active cart found', 404));
  }

  // Validate and get products
  const productIds = items.map(item => item.productId);
  const products = await Product.findAll({
    where: {
      id: { [Op.in]: productIds },
      isActive: true
    }
  });

  if (products.length !== items.length) {
    return next(new AppError('One or more products are not available', 400));
  }

  // Check stock availability
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for ${product.name}`, 400));
    }
  }

  // Calculate totals
  let subtotal = 0;
  const orderItems = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    subtotal += product.price * item.quantity;
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };
  });

  const taxAmount = subtotal * 0.08; // 8% tax
  const shippingAmount = subtotal >= 50 ? 0 : 9.99; // Free shipping over $50
  let discountAmount = 0;

  // Apply coupon if provided
  if (couponCode) {
    const validCoupons = {
      'SAVE10': { type: 'percentage', value: 10 },
      'SAVE20': { type: 'percentage', value: 20 },
      'FREESHIP': { type: 'shipping', value: 0 },
      'SAVE5': { type: 'fixed', value: 5 }
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      if (coupon.type === 'percentage') {
        discountAmount = subtotal * (coupon.value / 100);
      } else if (coupon.type === 'fixed') {
        discountAmount = coupon.value;
      } else if (coupon.type === 'shipping') {
        discountAmount = shippingAmount;
      }
    }
  }

  const total = subtotal + taxAmount + shippingAmount - discountAmount;

  // Create order
  const order = await Order.create({
    userId,
    items: orderItems,
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    total,
    currency: 'USD',
    couponCode: couponCode ? couponCode.toUpperCase() : null,
    discountType: discountAmount > 0 ? 'percentage' : null,
    discountValue: discountAmount > 0 ? (discountAmount / subtotal) * 100 : null,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    paymentMethod,
    customerNotes,
    status: 'pending',
    paymentStatus: 'pending'
  });

  // Process payment if not cash on delivery
  if (paymentMethod !== 'cash_on_delivery') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          orderId: order.id,
          userId: userId
        }
      });

      order.paymentDetails = { clientSecret: paymentIntent.client_secret };
      await order.save();
    } catch (error) {
      return next(new AppError('Payment processing failed', 500));
    }
  }

  // Update product stock
  for (const item of orderItems) {
    const product = products.find(p => p.id === item.productId);
    product.stock -= item.quantity;
    product.updateStockStatus();
    await product.save();
  }

  // Clear user's cart
  cart.clear();
  await cart.save();

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    data: {
      order,
      clientSecret: order.paymentDetails?.clientSecret
    }
  });
});

// Get user's orders
const getOrders = catchAsync(async (req, res, next) => {
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

// Get single order
const getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const order = await Order.findOne({
    where: {
      id,
      userId
    }
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

// Update order (admin only)
const updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const order = await Order.findByPk(id);
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  // Update order
  Object.assign(order, updateData);
  await order.save();

  res.status(200).json({
    status: 'success',
    message: 'Order updated successfully',
    data: {
      order
    }
  });
});

// Cancel order
const cancelOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const order = await Order.findOne({
    where: {
      id,
      userId
    }
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (!order.canBeCancelled()) {
    return next(new AppError('Order cannot be cancelled at this stage', 400));
  }

  // Update order status
  order.updateStatus('cancelled');

  // Restore product stock
  for (const item of order.items) {
    const product = await Product.findByPk(item.productId);
    if (product) {
      product.stock += item.quantity;
      product.updateStockStatus();
      await product.save();
    }
  }

  await order.save();

  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully',
    data: {
      order
    }
  });
});

// Get order statistics (admin only)
const getOrderStats = catchAsync(async (req, res, next) => {
  const stats = await Order.findAll({
    attributes: [
      'status',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      [sequelize.fn('SUM', sequelize.col('total')), 'totalRevenue'],
      [sequelize.fn('AVG', sequelize.col('total')), 'avgOrderValue']
    ],
    group: ['status'],
    raw: true
  });

  const totalOrders = await Order.count();
  const totalRevenue = await Order.sum('total');
  const pendingOrders = await Order.count({ where: { status: 'pending' } });

  res.status(200).json({
    status: 'success',
    data: {
      stats,
      summary: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
      }
    }
  });
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  cancelOrder,
  getOrderStats
};