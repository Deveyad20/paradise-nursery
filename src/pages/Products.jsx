import { useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setSelectedCategory, setSearchQuery } from '../store/slices/productSlice'
import ProductGrid from '../components/Product/ProductGrid'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Products = () => {
  const dispatch = useAppDispatch()
  const { products, categories, selectedCategory, searchQuery: reduxSearchQuery } = useAppSelector((state) => state.products)
  const [localSearchQuery, setLocalSearchQuery] = useState(reduxSearchQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search query
    if (localSearchQuery.trim()) {
      const query = localSearchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [products, selectedCategory, localSearchQuery])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchQuery(value)
    dispatch(setSearchQuery(value))
    setCurrentPage(1) // Reset to first page when searching
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
    setCurrentPage(1) // Reset to first page when changing category
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Plant Collection
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Discover our beautiful selection of plants for every space and lifestyle
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search plants..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
          {(selectedCategory !== 'All' || localSearchQuery) && (
            <button
              onClick={() => {
                handleCategoryChange('All')
                setLocalSearchQuery('')
                dispatch(setSearchQuery(''))
                setCurrentPage(1)
              }}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
          {localSearchQuery && ` for "${localSearchQuery}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={paginatedProducts}
        loading={false}
        emptyMessage={localSearchQuery ? `No products found for "${localSearchQuery}"` : "No products available in this category"}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Products