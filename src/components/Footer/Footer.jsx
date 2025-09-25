import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Paradise Nursery
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your trusted partner for beautiful plants and gardening supplies.
              We bring nature closer to your home with our curated collection of
              high-quality plants and expert care advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                Twitter
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=indoor" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=outdoor" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=succulents" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Succulents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
            © 2024 Paradise Nursery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer