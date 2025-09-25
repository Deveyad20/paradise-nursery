import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'system',
  systemTheme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },

    setSystemTheme: (state, action) => {
      state.systemTheme = action.payload
    },

    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark'
      } else if (state.theme === 'dark') {
        state.theme = 'system'
      } else {
        state.theme = 'light'
      }
    },
  },
})

export const { setTheme, setSystemTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer