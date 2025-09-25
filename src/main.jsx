import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { store } from './store/store'
import App from './App'
import './style.css'

// Handle GitHub Pages SPA redirect
const path = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);
const redirectPath = searchParams.get('/');

// If we're on GitHub Pages and have a redirect path, update the browser history
if (redirectPath && window.location.hostname.includes('github.io')) {
  // Replace the current URL with the correct path
  const newUrl = window.location.origin + redirectPath + window.location.hash;
  window.history.replaceState({}, '', newUrl);
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)