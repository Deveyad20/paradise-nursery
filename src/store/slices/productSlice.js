import { createSlice } from '@reduxjs/toolkit'
import { products as productData } from '../../data/products'

const initialState = {
  products: productData,
  categories: ['All', 'Indoor Plants', 'Outdoor Plants', 'Succulents', 'Flowering', 'Herbs', 'Trees'],
  searchQuery: '',
  selectedCategory: 'All',
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    },

    addProduct: (state, action) => {
      state.products.push(action.payload)
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
  },
})

export const {
  setProducts,
  setSearchQuery,
  setSelectedCategory,
  setLoading,
  setError,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions

export default productSlice.reducer