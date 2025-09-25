import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import productSlice from './slices/productSlice'
import userSlice from './slices/userSlice'
import themeSlice from './slices/themeSlice'
import wishlistSlice from './slices/wishlistSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    user: userSlice,
    theme: themeSlice,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export default store
// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions