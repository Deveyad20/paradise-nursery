import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setTheme, setSystemTheme } from '../store/slices/themeSlice'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const dispatch = useAppDispatch()
  const { theme: selectedTheme, systemTheme } = useAppSelector((state) => state.theme)

  // Determine the actual theme to use
  const actualTheme = selectedTheme === 'system' ? systemTheme : selectedTheme

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      dispatch(setSystemTheme(e.matches ? 'dark' : 'light'))
    }

    // Set initial system theme
    dispatch(setSystemTheme(mediaQuery.matches ? 'dark' : 'light'))

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [dispatch])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement

    if (actualTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Store theme preference in localStorage
    localStorage.setItem('theme', selectedTheme)
  }, [actualTheme, selectedTheme])

  const handleSetTheme = (theme) => {
    dispatch(setTheme(theme))
  }

  const handleToggleTheme = () => {
    if (selectedTheme === 'light') {
      dispatch(setTheme('dark'))
    } else if (selectedTheme === 'dark') {
      dispatch(setTheme('system'))
    } else {
      dispatch(setTheme('light'))
    }
  }

  const value = {
    theme: selectedTheme,
    systemTheme,
    actualTheme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}