# 🌱 Paradise Nursery API

A comprehensive RESTful API for the Paradise Nursery e-commerce Progressive Web Application. Built with Node.js, Express, and Sequelize ORM.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔌 API Endpoints](#-api-endpoints)
- [🔐 Authentication](#-authentication)
- [📊 Database Models](#-database-models)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [📝 Environment Variables](#-environment-variables)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with refresh tokens
- **Role-based access control** (customer, admin, manager)
- **Password hashing** with bcrypt
- **Email verification** system
- **Password reset** functionality

### 🛍️ E-commerce Core
- **Product management** with categories and filtering
- **Shopping cart** with persistent storage
- **Order processing** with payment integration
- **User profiles** and address management
- **Inventory management** with stock tracking

### 📱 PWA Support
- **CORS enabled** for cross-origin requests
- **Rate limiting** for API protection
- **Error handling** with detailed responses
- **Request validation** with express-validator

### 🗄️ Database Features
- **Sequelize ORM** with migrations
- **SQLite** for development (PostgreSQL for production)
- **Model relationships** and associations
- **Data seeding** for development

## 🛠️ Tech Stack

### Backend Framework
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Sequelize** - ORM for database management

### Security & Middleware
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token management
- **express-validator** - Request validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

### Database
- **SQLite** - Development database
- **PostgreSQL** - Production database (recommended)

### Email & Communication
- **nodemailer** - Email sending
- **stripe** - Payment processing

### Development Tools
- **nodemon** - Development server auto-restart
- **jest** - Testing framework
- **supertest** - HTTP testing utilities

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher

### Installation

1. **Navigate to API directory**
   ```bash
   cd api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Test the API**
   ```bash
   curl http://localhost:5000/api/health
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with nodemon
npm run start        # Start production server

# Database
npm run seed         # Seed database with sample data

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
```

## 📁 Project Structure

```
api/
├── controllers/           # Route controllers
│   ├── authController.js    # Authentication logic
│   ├── cartController.js    # Cart management
│   ├── orderController.js   # Order processing
│   ├── productController.js # Product management
│   └── userController.js    # User profile management
├── middleware/            # Custom middleware
│   ├── auth.js             # Authentication middleware
│   ├── errorHandler.js     # Error handling
│   ├── notFound.js         # 404 handler
│   └── validation.js       # Request validation
├── models/                # Database models
│   ├── index.js            # Database connection & associations
│   ├── User.js             # User model
│   ├── Product.js          # Product model
│   ├── Cart.js             # Cart model
│   └── Order.js            # Order model
├── routes/                # Route definitions
│   ├── auth.js             # Authentication routes
│   ├── cart.js             # Cart routes
│   ├── orders.js           # Order routes
│   ├── products.js         # Product routes
│   └── users.js            # User routes
├── utils/                 # Utility functions
│   └── email.js           # Email utilities
├── data/                  # Sample data
│   └── sampleData.js      # Seed data
├── scripts/               # Utility scripts
│   └── seedData.js        # Database seeding script
├── server.js              # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .env.example          # Environment template
└── README.md             # This file
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token",
  "password": "NewPassword123!"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=indoor&careLevel=easy
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Search Products
```http
GET /api/products/search?q=monstera&page=1&limit=10
```

#### Get Products by Category
```http
GET /api/products/category/:category
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Monstera Deliciosa",
  "description": "Beautiful tropical plant",
  "price": 45.99,
  "category": "indoor",
  "stock": 25,
  "careLevel": "easy"
}
```

### Cart Endpoints

#### Get User's Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add Item to Cart
```http
POST /api/cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /api/cart/items/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/items/:id
Authorization: Bearer <token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

#### Apply Coupon
```http
POST /api/cart/coupon
Authorization: Bearer <token>
Content-Type: application/json

{
  "couponCode": "SAVE10"
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product-uuid",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

#### Get User's Orders
```http
GET /api/orders?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

#### Get Single Order
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Cancel Order
```http
PATCH /api/orders/:id/cancel
Authorization: Bearer <token>
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Change Password
```http
PUT /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

#### Get User Addresses
```http
GET /api/users/addresses
Authorization: Bearer <token>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Token Response
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer"
    }
  }
}
```

### Role-Based Access
- **customer**: Can access own resources
- **admin**: Full access to all resources
- **manager**: Limited admin access

## 📊 Database Models

### User Model
```javascript
{
  id: UUID,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String,
  dateOfBirth: Date,
  role: Enum ('customer', 'admin', 'manager'),
  isEmailVerified: Boolean,
  isActive: Boolean,
  preferences: JSON,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  id: UUID,
  name: String,
  slug: String (unique),
  description: Text,
  price: Decimal,
  category: Enum,
  stock: Integer,
  careLevel: Enum,
  lightRequirement: Enum,
  waterRequirement: Enum,
  toxicToPets: Boolean,
  isActive: Boolean,
  isFeatured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Model
```javascript
{
  id: UUID,
  userId: UUID,
  sessionId: String (for guests),
  items: JSON Array,
  subtotal: Decimal,
  taxAmount: Decimal,
  shippingAmount: Decimal,
  discountAmount: Decimal,
  total: Decimal,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  id: UUID,
  orderNumber: String (unique),
  userId: UUID,
  status: Enum,
  paymentStatus: Enum,
  fulfillmentStatus: Enum,
  items: JSON Array,
  subtotal: Decimal,
  taxAmount: Decimal,
  shippingAmount: Decimal,
  discountAmount: Decimal,
  total: Decimal,
  shippingAddress: JSON,
  billingAddress: JSON,
  paymentMethod: Enum,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
api/
├── __tests__/
│   ├── controllers/
│   │   ├── authController.test.js
│   │   ├── productController.test.js
│   │   └── ...
│   ├── models/
│   │   ├── User.test.js
│   │   ├── Product.test.js
│   │   └── ...
│   └── integration/
│       ├── auth.test.js
│       ├── products.test.js
│       └── ...
```

### Example Test
```javascript
const request = require('supertest');
const app = require('../server');

describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User'
      })
      .expect(201);

    expect(response.body.status).toBe('success');
    expect(response.body.data.user.email).toBe('test@example.com');
  });
});
```

## 🚢 Deployment

### Production Deployment

1. **Set up production environment**
   ```bash
   cp .env.example .env.production
   # Edit with production values
   ```

2. **Install production dependencies**
   ```bash
   npm ci --production
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Set up process manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "paradise-nursery-api"
   pm2 startup
   pm2 save
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

USER node

CMD ["npm", "start"]
```

### Environment Setup

#### Production Environment Variables
```env
NODE_ENV=production
PORT=5000
DB_DIALECT=postgres
DB_HOST=your-db-host
DB_NAME=paradise_nursery_prod
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=your-production-jwt-secret
EMAIL_HOST=your-smtp-host
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
STRIPE_SECRET_KEY=sk_live_your_stripe_key
```

## 📝 Environment Variables

### Required Variables
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key
DB_DIALECT=sqlite
```

### Database Configuration
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=paradise_nursery
DB_USER=postgres
DB_PASSWORD=password
SQLITE_DB_PATH=./data/paradise_nursery.db
```

### Email Configuration
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@paradisenursery.com
```

### Payment Configuration
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### Security Configuration
```env
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔧 Development Guidelines

### Code Style
- Use ESLint and Prettier for code formatting
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add JSDoc comments for functions

### Error Handling
- Use the custom error handler for consistent error responses
- Validate all input data
- Return appropriate HTTP status codes

### Security Best Practices
- Hash passwords with bcrypt
- Use JWT for authentication
- Validate and sanitize all inputs
- Implement rate limiting
- Use HTTPS in production

### Database Best Practices
- Use transactions for complex operations
- Implement proper indexing
- Handle database connections properly
- Use migrations for schema changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact:
- Email: support@paradisenursery.com
- Documentation: [API Documentation](https://docs.paradisenursery.com/api)

---

<div align="center">

**Built with ❤️ for Paradise Nursery**

[🌐 Frontend App](https://paradise-nursery.vercel.app) •
[📧 Contact Support](mailto:support@paradisenursery.com) •
[🐛 Report Issues](https://github.com/your-org/paradise-nursery-api/issues)

</div>