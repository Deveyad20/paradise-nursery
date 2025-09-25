const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true // For guest users
    },
    items: {
      type: DataTypes.JSON,
      defaultValue: [],
      validate: {
        isValidCartItem(value) {
          if (!Array.isArray(value)) {
            throw new Error('Cart items must be an array');
          }

          value.forEach(item => {
            if (!item.productId || !item.quantity) {
              throw new Error('Each cart item must have productId and quantity');
            }
            if (item.quantity < 1 || item.quantity > 99) {
              throw new Error('Item quantity must be between 1 and 99');
            }
          });
        }
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    shippingAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    couponCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discountType: {
      type: DataTypes.ENUM('percentage', 'fixed', 'shipping'),
      allowNull: true
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    itemCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['sessionId']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['expiresAt']
      }
    ]
  });

  // Instance methods
  Cart.prototype.calculateTotals = function() {
    let subtotal = 0;
    let itemCount = 0;

    this.items.forEach(item => {
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
    });

    // Calculate tax (assuming 8% tax rate)
    const taxAmount = subtotal * 0.08;

    // Calculate shipping (free shipping over $50)
    const shippingAmount = subtotal >= 50 ? 0 : 9.99;

    // Apply discount if exists
    let discountAmount = 0;
    if (this.couponCode && this.discountValue) {
      if (this.discountType === 'percentage') {
        discountAmount = subtotal * (this.discountValue / 100);
      } else if (this.discountType === 'fixed') {
        discountAmount = this.discountValue;
      } else if (this.discountType === 'shipping') {
        discountAmount = shippingAmount;
      }
    }

    const total = subtotal + taxAmount + shippingAmount - discountAmount;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      shippingAmount: parseFloat(shippingAmount.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount
    };
  };

  Cart.prototype.addItem = function(product, quantity = 1) {
    const existingItemIndex = this.items.findIndex(
      item => item.productId === product.id
    );

    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity += quantity;
    } else {
      this.items.push({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.featuredImage,
        quantity: quantity,
        maxQuantity: product.stock
      });
    }

    const totals = this.calculateTotals();
    Object.assign(this, totals);

    return this;
  };

  Cart.prototype.updateItemQuantity = function(productId, quantity) {
    const itemIndex = this.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.items.splice(itemIndex, 1);
      } else {
        this.items[itemIndex].quantity = quantity;
      }

      const totals = this.calculateTotals();
      Object.assign(this, totals);
    }

    return this;
  };

  Cart.prototype.removeItem = function(productId) {
    this.items = this.items.filter(item => item.productId !== productId);

    const totals = this.calculateTotals();
    Object.assign(this, totals);

    return this;
  };

  Cart.prototype.clear = function() {
    this.items = [];
    this.subtotal = 0;
    this.taxAmount = 0;
    this.shippingAmount = 0;
    this.discountAmount = 0;
    this.total = 0;
    this.itemCount = 0;
    this.couponCode = null;
    this.discountType = null;
    this.discountValue = null;

    return this;
  };

  Cart.prototype.applyCoupon = function(couponCode, discountType, discountValue) {
    this.couponCode = couponCode;
    this.discountType = discountType;
    this.discountValue = discountValue;

    const totals = this.calculateTotals();
    Object.assign(this, totals);

    return this;
  };

  Cart.prototype.removeCoupon = function() {
    this.couponCode = null;
    this.discountType = null;
    this.discountValue = null;

    const totals = this.calculateTotals();
    Object.assign(this, totals);

    return this;
  };

  // Hooks
  Cart.beforeSave(async (cart) => {
    // Set expiration for guest carts (30 days)
    if (cart.sessionId && !cart.userId && !cart.expiresAt) {
      cart.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    // Update totals if items changed
    if (cart.changed('items')) {
      const totals = cart.calculateTotals();
      Object.assign(cart, totals);
    }
  });

  Cart.afterCreate(async (cart) => {
    // Could trigger analytics or notifications
    console.log(`Cart created with ${cart.itemCount} items`);
  });

  return Cart;
};