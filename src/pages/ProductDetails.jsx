import { useParams, Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import ProductDetailsComponent from '../components/Product/ProductDetails'
import { ArrowLeft } from 'lucide-react'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const { products } = useAppSelector((state) => state.products)

  // Find the product by ID
  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/" className="hover:text-green-600 dark:hover:text-green-400">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-green-600 dark:hover:text-green-400">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Details Component */}
      <ProductDetailsComponent product={product} />
    </div>
  )
}

export default ProductDetailsPage