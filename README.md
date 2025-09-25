# 🌱 Paradise Nursery - E-commerce PWA

A modern, full-featured e-commerce Progressive Web Application for plant enthusiasts. Built with cutting-edge web technologies to deliver a seamless shopping experience across all devices.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa)](https://web.dev/pwa/)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [📱 PWA Features](#-pwa-features)
- [🏗️ Architecture](#%EF%B8%8F-architecture)
- [🔌 API Integration](#-api-integration)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)

## ✨ Features

### 🛍️ E-commerce Core
- **Product Catalog**: Browse extensive plant collection with advanced filtering
- **Shopping Cart**: Persistent cart with real-time updates
- **Wishlist**: Save favorite plants for later
- **User Authentication**: Secure login/registration system
- **Checkout Process**: Complete order flow with validation
- **Order Management**: Track and manage orders

### 🌿 Plant-Specific Features
- **Care Guides**: Comprehensive plant care information
- **Plant Categories**: Organized by type, care level, and environment
- **Search & Filters**: Find plants by name, price, care requirements
- **Product Details**: Detailed specifications and growing instructions

### 📱 Progressive Web App
- **Offline Support**: Full functionality without internet connection
- **App Installation**: Install on any device like a native app
- **Background Sync**: Seamless data synchronization
- **Push Notifications**: Order updates and plant care reminders
- **Responsive Design**: Optimized for all screen sizes

### 🎨 User Experience
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Dark/Light Theme**: Adaptive theming system
- **Accessibility**: WCAG compliant with screen reader support
- **Performance**: Optimized loading and caching strategies

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Modern React with concurrent features
- **React Router DOM 7.9.1** - Client-side routing
- **TypeScript Support** - Enhanced development experience

### Build & Development
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Vendor prefixing

### State Management
- **Redux Toolkit 2.9.0** - Modern Redux with less boilerplate
- **React Redux 9.2.0** - React bindings for Redux
- **Redux DevTools** - Enhanced debugging experience

### UI & Animation
- **Framer Motion 12.23.20** - Production-ready animations
- **Lucide React 0.544.0** - Beautiful icon library
- **React Icons 5.5.0** - Comprehensive icon collection
- **Class Variance Authority** - Component styling utilities

### Forms & Validation
- **React Hook Form 7.63.0** - Performant forms with minimal re-renders
- **Yup 1.7.1** - Schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Yup

### PWA Features
- **Vite PWA Plugin** - Automatic PWA setup
- **Workbox** - Service worker and caching strategies
- **Web App Manifest** - App installation metadata

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paradise-nursery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# PWA Specific
npm run pwa          # Build and serve PWA locally

# Production
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

## 📁 Project Structure

```
paradise-nursery/
├── public/                 # Static assets
│   ├── icons/             # PWA icons and favicons
│   ├── site.webmanifest   # PWA manifest
│   └── ...
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Cart/         # Shopping cart components
│   │   ├── Header/       # Navigation components
│   │   ├── Product/      # Product-related components
│   │   └── ...
│   ├── contexts/         # React contexts
│   │   └── ThemeContext.jsx
│   ├── data/             # Static data and mock data
│   │   └── products.js
│   ├── hooks/            # Custom React hooks
│   │   └── redux.js
│   ├── pages/            # Route components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   └── ...
│   ├── store/            # Redux store configuration
│   │   ├── slices/       # Redux slices
│   │   └── store.js
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   ├── style.css         # Global styles
│   └── sw.js             # Service worker
├── dev-dist/             # Development build output
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # This file
```

## 🔧 Development

### Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Code Organization**
   - Components are organized by feature in `/src/components/`
   - Pages are route-based components in `/src/pages/`
   - State management uses Redux slices in `/src/store/slices/`
   - Types are centralized in `/src/types/`

3. **Styling Guidelines**
   - Use Tailwind CSS utility classes
   - Follow mobile-first responsive design
   - Maintain consistent spacing and typography
   - Use CSS custom properties for theming

4. **State Management**
   - Use Redux Toolkit for complex state
   - Prefer local component state for simple UI state
   - Follow Redux best practices for actions and reducers

### Code Quality

- **ESLint**: Configured for React and modern JavaScript
- **Prettier**: Code formatting and consistency
- **TypeScript**: Optional type safety (ready for migration)
- **Component Testing**: Ready for Jest/React Testing Library

## 📱 PWA Features

### Installation

#### Mobile Devices
- **Chrome/Android**: Tap install button in address bar or menu
- **Safari/iOS**: Use "Add to Home Screen" from share menu
- **Firefox**: Install from address bar menu

#### Desktop
- **Chrome/Edge**: Click install icon in address bar
- **Firefox**: Install from address bar menu

### Offline Capabilities

#### Cached Content
- ✅ Product catalog and details
- ✅ Plant care guides
- ✅ User profile and settings
- ✅ Shopping cart and wishlist
- ✅ Static pages and assets

#### Smart Caching Strategy
- **Cache First**: Static assets (images, CSS, JS)
- **Network First**: Dynamic content (user data, orders)
- **Stale While Revalidate**: Product catalog
- **Background Sync**: Form submissions and cart updates

### Service Worker Features

- **Automatic Updates**: Seamless app updates
- **Background Sync**: Offline action synchronization
- **Push Notifications**: Order and care reminders
- **Offline Detection**: Graceful offline experience

## 🏗️ Architecture

### Component Architecture

```
App.jsx (Root Component)
├── Header (Navigation)
├── Main Content (Routes)
│   ├── Home (Landing page)
│   ├── Products (Catalog with filters)
│   ├── ProductDetails (Individual product)
│   ├── Cart (Shopping cart)
│   ├── Checkout (Order flow)
│   └── ... (Other pages)
└── Footer (Site information)
```

### State Architecture

```
Redux Store
├── cartSlice (Shopping cart state)
├── productSlice (Product catalog)
├── userSlice (User authentication)
├── wishlistSlice (User wishlist)
├── themeSlice (UI theme)
└── ... (Other slices)
```

### Data Flow

1. **User Interaction** → Component → Action → Reducer → Store
2. **API Calls** → Thunk/Action → API → Store Update
3. **PWA Events** → Service Worker → Background Sync → Store
4. **Theme Changes** → Context → Component Re-render

## 🔌 API Integration

### RESTful API Endpoints

```
GET    /api/products          # Fetch product catalog
GET    /api/products/:id      # Get product details
POST   /api/cart              # Add item to cart
PUT    /api/cart/:id          # Update cart item
DELETE /api/cart/:id          # Remove cart item
GET    /api/user/profile      # Get user profile
POST   /api/auth/login        # User authentication
POST   /api/auth/register     # User registration
POST   /api/orders            # Create new order
GET    /api/orders/:id        # Get order details
```

### Authentication

- **JWT Tokens**: Secure authentication with refresh tokens
- **Session Management**: Automatic token refresh
- **Protected Routes**: Route-level authentication guards
- **Password Security**: Bcrypt hashing and validation

### Error Handling

- **Global Error Boundary**: Catches and handles React errors
- **API Error Handling**: Consistent error responses
- **User Feedback**: Toast notifications and error messages
- **Retry Logic**: Automatic retry for failed requests

## 🚢 Deployment

### Build Process

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Build Output**
   - Optimized JavaScript bundles
   - Minified CSS with Tailwind purging
   - Service worker with caching strategies
   - PWA manifest and icons
   - Static asset optimization

### Deployment Platforms

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your web server
```

### Environment Variables

Create `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=https://api.paradisenursery.com
VITE_APP_NAME="Paradise Nursery"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🤝 Contributing

### Development Setup

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Install dependencies**: `npm install`
4. **Make your changes**
5. **Run tests**: `npm test`
6. **Commit changes**: `git commit -m 'Add amazing feature'`
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open Pull Request**

### Code Standards

- **ESLint**: Follow configured linting rules
- **Prettier**: Use consistent code formatting
- **Commit Messages**: Use conventional commit format
- **Pull Requests**: Include description and screenshots

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test ProductCard.test.jsx
```

## 🐛 Troubleshooting

### Common Issues

#### Service Worker Problems
```bash
# Clear service worker cache
1. Open DevTools → Application → Service Workers
2. Unregister existing service worker
3. Clear Storage → Cache Storage
4. Reload page
```

#### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### PWA Installation Issues
- Ensure HTTPS in production
- Check manifest.json validity
- Verify all icon sizes are present
- Clear browser cache and try again

### Performance Issues

#### Slow Loading
- Check network tab for large assets
- Verify service worker caching
- Optimize images and fonts
- Enable gzip compression

#### Memory Leaks
- Monitor memory usage in DevTools
- Check for component memory leaks
- Verify event listener cleanup
- Monitor Redux store size

### Browser Compatibility

#### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

#### Polyfill Requirements
- Core-js for older browsers
- Intersection Observer polyfill
- WebP image support detection

## 📊 Performance Metrics

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### PWA Metrics
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Install Prompt Success Rate**: > 15%

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+
- **PWA**: 95+

## 🔄 Updates and Maintenance

### Regular Tasks
- **Dependency Updates**: Monthly security updates
- **Performance Monitoring**: Weekly performance checks
- **Content Updates**: Regular plant catalog updates
- **User Feedback**: Monthly feedback review

### Monitoring
- **Error Tracking**: Sentry or similar service
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Google Analytics or similar
- **PWA Metrics**: Installation and usage tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the blazing-fast build tool
- **Tailwind CSS** for the utility-first approach
- **Redux Toolkit** for simplifying state management
- **Open Source Community** for the incredible tools and libraries

---

<div align="center">

**Built with ❤️ for Plant Lovers**

[🌐 Live Demo](https://paradise-nursery.vercel.app) •
[📧 Contact Us](mailto:contact@paradisenursery.com) •
[🐛 Report Issues](https://github.com/Deveyad20/paradise-nursery/issues) •
[📖 Documentation](https://docs.paradisenursery.com)

*Transform your space with nature's finest creations* 🌱✨

</div>
