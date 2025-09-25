import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  itemCount: 0,
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload
      const existingItem = state.items.find(item => item.productId === productId)

      if (!existingItem) {
        state.items.push({
          id: Date.now().toString(),
          productId,
          addedAt: new Date().toISOString(),
        })
      }

      state.itemCount = state.items.length
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.productId !== productId)
      state.itemCount = state.items.length
    },

    clearWishlist: (state) => {
      state.items = []
      state.itemCount = 0
    },

    toggleWishlistItem: (state, action) => {
      const productId = action.payload
      const existingItem = state.items.find(item => item.productId === productId)

      if (existingItem) {
        state.items = state.items.filter(item => item.productId !== productId)
      } else {
        state.items.push({
          id: Date.now().toString(),
          productId,
          addedAt: new Date().toISOString(),
        })
      }

      state.itemCount = state.items.length
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlistItem } = wishlistSlice.actions
export default wishlistSlice.reducer