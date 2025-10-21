import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'   // <-- importa BrowserRouter
import { AuthProvider } from '@/Context/AuthContext'
import './themes/global.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './helpers/TypeThemes'
import AppRoutes from './helpers/AppRoutes'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>                      
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
