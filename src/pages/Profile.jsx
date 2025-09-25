import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  User,
  Settings,
  Package,
  Heart,
  ShoppingCart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  Award,
  TrendingUp,
  Clock,
  Star,
  Gift
} from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { updateUser } from '../store/slices/userSlice'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.user)
  const { items: cartItems, itemCount: cartCount, total: cartTotal } = useAppSelector((state) => state.cart)
  const { items: wishlistItems, itemCount: wishlistCount } = useAppSelector((state) => state.wishlist)
  const { products } = useAppSelector((state) => state.products)

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Garden Street, Plant City, PC 12345',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  })

  // Mock user data if not authenticated
  const currentUser = user || editedUser

  // Calculate user statistics
  const totalSpent = 1249.99 // Mock data
  const totalOrders = 12 // Mock data
  const memberSince = new Date(currentUser.joinDate || '2024-01-15')
  const daysSinceJoined = Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24))

  // Get recent wishlist items
  const recentWishlistItems = wishlistItems.slice(0, 3).map(item => {
    const product = products.find(p => p.id === item.productId)
    return product ? { ...product, addedAt: item.addedAt } : null
  }).filter(Boolean)

  const handleSaveProfile = () => {
    dispatch(updateUser(editedUser))
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedUser(currentUser)
    setIsEditing(false)
  }

  if (!isAuthenticated && !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Sign in to access your personalized dashboard, order history, and wishlist.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <span>Sign In</span>
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
              Welcome back, {currentUser.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Member for {daysSinceJoined} days • {totalOrders} orders placed
            </p>
          </div>

          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentUser.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{currentUser.email}</p>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      className="w-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{currentUser.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      className="w-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{currentUser.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  {isEditing ? (
                    <textarea
                      value={editedUser.address}
                      onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                      rows={3}
                      className="w-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{currentUser.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(currentUser.joinDate || '2024-01-15').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column - Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{cartCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Wishlist</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{wishlistCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Added items to cart</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  +${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Added to wishlist</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  +{wishlistCount} items
                </span>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Order delivered</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  Order #1234
                </span>
              </div>
            </div>
          </div>

          {/* Recent Wishlist Items */}
          {recentWishlistItems.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Wishlist Items
                </h3>
                <Link
                  to="/wishlist"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentWishlistItems.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile