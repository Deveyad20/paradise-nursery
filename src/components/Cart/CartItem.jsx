import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useAppDispatch } from '../../hooks/redux'
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice'

const CartItem = ({ item, index }) => {
  const dispatch = useAppDispatch()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id))
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {item.category}
        </p>
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          ${item.price}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-8 text-center text-gray-900 dark:text-white font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-0">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  )
}

export default CartItem