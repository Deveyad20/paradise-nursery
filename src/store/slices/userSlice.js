import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.loading = false
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, updateUser, setLoading, setError, logout, clearError } = userSlice.actions
export default userSlice.reducer