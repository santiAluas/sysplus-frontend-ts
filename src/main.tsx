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
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from '@/utils/dayjs-setup'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      dateLibInstance={dayjs}  // usa tu instancia con tz
    >
    <BrowserRouter>                      
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
)
