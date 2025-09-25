import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addToCart } from '../../store/slices/cartSlice'
import { toggleWishlistItem } from '../../store/slices/wishlistSlice'

const ProductCard = ({ product, index = 0 }) => {
  const dispatch = useAppDispatch()
  const { items: cartItems } = useAppSelector((state) => state.cart)
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)

  const isInWishlist = wishlistItems.some(item => item.productId === product.id)
  const isInCart = cartItems.some(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

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
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleWishlistItem(product.id))
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`}
            />
          </button>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              -{discountPercentage}%
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-3 py-1 rounded font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
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

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>

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

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isInCart}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              isInCart
                ? 'bg-green-700 text-white cursor-not-allowed'
                : product.inStock
                ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              {isInCart
                ? 'Added to Cart'
                : product.inStock
                ? 'Add to Cart'
                : 'Out of Stock'
              }
            </span>
          </button>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard