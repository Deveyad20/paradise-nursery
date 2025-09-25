import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addToCart } from '../../store/slices/cartSlice'
import { toggleWishlistItem } from '../../store/slices/wishlistSlice'

const ProductDetails = ({ product }) => {
  const dispatch = useAppDispatch()
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const isInWishlist = wishlistItems.some(item => item.productId === product.id)
  const images = product.images || [product.image]

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      category: product.category,
      description: product.description,
    }

    dispatch(addToCart(cartItem))
  }

  const handleToggleWishlist = () => {
    dispatch(toggleWishlistItem(product.id))
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{discountPercentage}%
              </div>
            )}
          </motion.div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-green-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Care Instructions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {product.careInstructions}
                </p>
              </div>
            )}

            {/* Plant Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.size && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Size</span>
                  <p className="font-medium text-gray-900 dark:text-white">{product.size}</p>
                </div>
              )}
              {product.lightRequirement && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Light</span>
                  <p className="font-medium text-gray-900 dark:text-white">{product.lightRequirement}</p>
                </div>
              )}
              {product.waterRequirement && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Water</span>
                  <p className="font-medium text-gray-900 dark:text-white">{product.waterRequirement}</p>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors duration-200"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-lg ${
                product.inStock
                  ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Quality Guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails