import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAppSelector } from '../../hooks/redux'
import { ShoppingCart, Heart, ChevronDown, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { items: cartItems, itemCount: cartCount } = useAppSelector((state) => state.cart)
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  const { isAuthenticated } = useAppSelector((state) => state.user)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center min-w-0 flex-1">
            <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 truncate">
              <span className="sm:hidden">PN</span>
              <span className="hidden sm:inline">Paradise Nursery</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
              Products
            </Link>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center space-x-1 text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                <span>More</span>
                <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    to="/care-guide"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    Care Guide
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/shipping"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    Shipping Info
                  </Link>
                  <Link
                    to="/returns"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    Returns
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-105 ${
              isMobileMenuOpen ? 'transform -translate-y-1' : ''
            }`}
          >
            <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Wishlist Icon with Counter - Hidden on small screens */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 hidden sm:block"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Icon with Counter */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="text-lg">{theme === 'dark' ? '🌞' : theme === 'light' ? '🌙' : '🖥️'}</span>
            </button>

            {/* Auth Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <Link to="/profile" className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                  Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2'
        }`}>
          <div className="px-3 sm:px-4 pt-3 pb-4 space-y-1">
            {/* Main Navigation */}
            <div className="space-y-1">
              <Link
                to="/"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🌱 Products
              </Link>
              <Link
                to="/cart"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🛒 Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link
                to="/wishlist"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ❤️ Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

            {/* Secondary Navigation */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Information
              </div>
              <Link
                to="/care-guide"
                className="block px-3 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📖 Care Guide
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📞 Contact Us
              </Link>
              <Link
                to="/shipping"
                className="block px-3 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🚚 Shipping Info
              </Link>
              <Link
                to="/returns"
                className="block px-3 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ↩️ Returns
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

            {/* Authentication */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Account
              </div>
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="block px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👤 Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🔐 Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-3 text-sm font-medium bg-green-600 text-white hover:bg-green-700 rounded-lg mx-3 mb-2 text-center transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ✨ Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header