const { Sequelize } = require('sequelize');
const path = require('path');

// Database configuration
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'paradise_nursery',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  storage: process.env.NODE_ENV === 'test'
    ? ':memory:'
    : process.env.SQLITE_DB_PATH || path.join(__dirname, '../data/paradise_nursery.db'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});

// Import models
const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const Cart = require('./Cart')(sequelize);
const Order = require('./Order')(sequelize);

// Define associations
User.hasMany(Cart, {
  foreignKey: 'userId',
  as: 'carts'
});

User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
});

Cart.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Product associations (for cart items and order items)
Product.hasMany(Cart, {
  foreignKey: 'productId',
  through: 'cart_items',
  as: 'carts'
});

Product.hasMany(Order, {
  foreignKey: 'productId',
  through: 'order_items',
  as: 'orders'
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    if (process.env.NODE_ENV !== 'test') {
      await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
      console.log('✅ Database synchronized successfully.');
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Initialize database
if (process.env.NODE_ENV !== 'test') {
  testConnection();
}

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  Order,
  testConnection
};