const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
        'returned'
      ),
      defaultValue: 'pending'
    },
    paymentStatus: {
      type: DataTypes.ENUM(
        'pending',
        'paid',
        'failed',
        'refunded',
        'partially_refunded'
      ),
      defaultValue: 'pending'
    },
    fulfillmentStatus: {
      type: DataTypes.ENUM(
        'unfulfilled',
        'partially_fulfilled',
        'fulfilled',
        'restocked'
      ),
      defaultValue: 'unfulfilled'
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidOrderItem(value) {
          if (!Array.isArray(value)) {
            throw new Error('Order items must be an array');
          }

          value.forEach(item => {
            if (!item.productId || !item.quantity || !item.price) {
              throw new Error('Each order item must have productId, quantity, and price');
            }
          });
        }
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    shippingAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
    shippingAddress: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredFields(value) {
          const required = ['street', 'city', 'state', 'zipCode', 'country'];
          required.forEach(field => {
            if (!value[field]) {
              throw new Error(`Shipping address must include ${field}`);
            }
          });
        }
      }
    },
    billingAddress: {
      type: DataTypes.JSON,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.ENUM(
        'credit_card',
        'debit_card',
        'paypal',
        'cash_on_delivery',
        'bank_transfer'
      ),
      allowNull: false
    },
    paymentDetails: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customerNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trackingUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shippedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refundedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refundAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['paymentStatus']
      },
      {
        fields: ['fulfillmentStatus']
      },
      {
        fields: ['orderNumber']
      },
      {
        fields: ['createdAt']
      },
      {
        unique: true,
        fields: ['orderNumber']
      }
    ]
  });

  // Instance methods
  Order.prototype.generateOrderNumber = function() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PN${timestamp}${random}`;
  };

  Order.prototype.calculateTotals = function() {
    let subtotal = 0;

    this.items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const taxAmount = subtotal * 0.08; // 8% tax
    const shippingAmount = subtotal >= 50 ? 0 : 9.99; // Free shipping over $50

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
      total: parseFloat(total.toFixed(2))
    };
  };

  Order.prototype.canBeCancelled = function() {
    return ['pending', 'confirmed'].includes(this.status);
  };

  Order.prototype.canBeRefunded = function() {
    return ['processing', 'shipped', 'delivered'].includes(this.status) &&
           this.paymentStatus === 'paid';
  };

  Order.prototype.updateStatus = function(newStatus) {
    const validTransitions = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['delivered', 'returned'],
      'delivered': ['returned'],
      'cancelled': [],
      'refunded': [],
      'returned': ['refunded']
    };

    if (validTransitions[this.status].includes(newStatus)) {
      this.status = newStatus;

      // Set timestamp based on status
      if (newStatus === 'shipped') {
        this.shippedAt = new Date();
      } else if (newStatus === 'delivered') {
        this.deliveredAt = new Date();
      } else if (newStatus === 'cancelled') {
        this.cancelledAt = new Date();
      } else if (newStatus === 'refunded') {
        this.refundedAt = new Date();
      }

      return true;
    }

    return false;
  };

  // Hooks
  Order.beforeCreate(async (order) => {
    // Generate order number if not provided
    if (!order.orderNumber) {
      order.orderNumber = order.generateOrderNumber();
    }

    // Calculate totals
    const totals = order.calculateTotals();
    Object.assign(order, totals);
  });

  Order.beforeUpdate(async (order) => {
    // Recalculate totals if items changed
    if (order.changed('items')) {
      const totals = order.calculateTotals();
      Object.assign(order, totals);
    }
  });

  Order.afterCreate(async (order) => {
    // Could trigger notifications, inventory updates, etc.
    console.log(`Order ${order.orderNumber} created for user ${order.userId}`);
  });

  return Order;
};