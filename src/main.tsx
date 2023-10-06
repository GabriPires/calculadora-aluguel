import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { ThemeProvider } from './contexts/theme-context.tsx'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
