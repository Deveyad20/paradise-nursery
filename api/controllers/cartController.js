const { Cart, Product, User } = require('../models');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

// Get user's cart
const getCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  let cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  // If no cart exists, create one
  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
      subtotal: 0,
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      total: 0,
      itemCount: 0,
      isActive: true
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart
    }
  });
});

// Add item to cart
const addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user.id;

  // Find product
  const product = await Product.findByPk(productId);
  if (!product || !product.isActive) {
    return next(new AppError('Product not found', 404));
  }

  // Check stock
  if (product.stock <= 0) {
    return next(new AppError('Product is out of stock', 400));
  }

  // Find or create cart
  let cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
      isActive: true
    });
  }

  // Add item to cart
  cart.addItem(product, quantity);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Item added to cart successfully',
    data: {
      cart
    }
  });
});

// Update cart item quantity
const updateCartItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  // Find cart
  const cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Update item quantity
  cart.updateItemQuantity(id, quantity);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Cart item updated successfully',
    data: {
      cart
    }
  });
});

// Remove item from cart
const removeFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Find cart
  const cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Remove item from cart
  cart.removeItem(id);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Item removed from cart successfully',
    data: {
      cart
    }
  });
});

// Clear cart
const clearCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Find cart
  const cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Clear cart
  cart.clear();
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Cart cleared successfully',
    data: {
      cart
    }
  });
});

// Apply coupon to cart
const applyCoupon = catchAsync(async (req, res, next) => {
  const { couponCode } = req.body;
  const userId = req.user.id;

  // Find cart
  const cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Validate coupon (simplified - in real app, check against coupon database)
  const validCoupons = {
    'SAVE10': { type: 'percentage', value: 10 },
    'SAVE20': { type: 'percentage', value: 20 },
    'FREESHIP': { type: 'shipping', value: 0 },
    'SAVE5': { type: 'fixed', value: 5 }
  };

  const coupon = validCoupons[couponCode.toUpperCase()];
  if (!coupon) {
    return next(new AppError('Invalid coupon code', 400));
  }

  // Check minimum purchase for percentage discounts
  if (coupon.type === 'percentage' && cart.subtotal < 25) {
    return next(new AppError('Minimum purchase of $25 required for this coupon', 400));
  }

  // Apply coupon
  cart.applyCoupon(couponCode.toUpperCase(), coupon.type, coupon.value);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Coupon applied successfully',
    data: {
      cart
    }
  });
});

// Remove coupon from cart
const removeCoupon = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Find cart
  const cart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Remove coupon
  cart.removeCoupon();
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Coupon removed successfully',
    data: {
      cart
    }
  });
});

// Merge guest cart with user cart (when user logs in)
const mergeGuestCart = catchAsync(async (req, res, next) => {
  const { sessionId, userId } = req.body;

  if (!sessionId || !userId) {
    return next(new AppError('Session ID and User ID are required', 400));
  }

  // Find guest cart
  const guestCart = await Cart.findOne({
    where: {
      sessionId,
      isActive: true
    }
  });

  if (!guestCart) {
    return next(new AppError('Guest cart not found', 404));
  }

  // Find user cart
  let userCart = await Cart.findOne({
    where: {
      userId,
      isActive: true
    }
  });

  if (!userCart) {
    // Convert guest cart to user cart
    guestCart.userId = userId;
    guestCart.sessionId = null;
    await guestCart.save();
  } else {
    // Merge guest cart items into user cart
    guestCart.items.forEach(item => {
      userCart.addItem({
        id: item.productId,
        price: item.price
      }, item.quantity);
    });
    await userCart.save();

    // Deactivate guest cart
    guestCart.isActive = false;
    await guestCart.save();
  }

  res.status(200).json({
    status: 'success',
    message: 'Carts merged successfully'
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  mergeGuestCart
};