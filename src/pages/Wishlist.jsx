import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { addToCart } from '../store/slices/cartSlice'
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice'

const Wishlist = () => {
  const dispatch = useAppDispatch()
  const { items: wishlistItems, itemCount } = useAppSelector((state) => state.wishlist)
  const { products } = useAppSelector((state) => state.products)
  const [addedToCart, setAddedToCart] = useState({})

  // Get full product details for wishlist items
  const wishlistProducts = wishlistItems.map(wishlistItem => {
    const product = products.find(p => p.id === wishlistItem.productId)
    return product ? { ...product, wishlistId: wishlistItem.id } : null
  }).filter(Boolean)

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
      description: product.description,
    }

    dispatch(addToCart(cartItem))
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))

    // Reset the "added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
  }

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      dispatch(clearWishlist())
    }
  }

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(product => {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        description: product.description,
      }
      dispatch(addToCart(cartItem))
    })
    setAddedToCart(wishlistProducts.reduce((acc, product) => ({ ...acc, [product.id]: true }), {}))

    // Reset all "added" states after 2 seconds
    setTimeout(() => {
      setAddedToCart({})
    }, 2000)
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Start adding plants to your wishlist to keep track of your favorites and get notified when they're on sale.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <span>Browse Plants</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>

          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={handleAddAllToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
            <button
              onClick={handleClearWishlist}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <Link to={`/products/${product.id}`} className="block">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove from wishlist button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRemoveFromWishlist(product.id)
                  }}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product.id}`} className="block">
                <div className="mb-2">
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                disabled={addedToCart[product.id]}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  addedToCart[product.id]
                    ? 'bg-green-700 text-white cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {addedToCart[product.id] ? 'Added to Cart!' : 'Add to Cart'}
                </span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Shopping CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Package className="w-5 h-5" />
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}

export default Wishlist