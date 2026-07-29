// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#1e3a8a',
      contrastText: '#ffffff',
    },

    secondary: {
      main: '#0a192f',
      contrastText: '#ffffff',
    },

    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },

    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",

    h1: {
      fontWeight: 700,
      fontSize: '2.2rem',
      color: '#0a192f',
    },

    h2: {
      fontWeight: 600,
      fontSize: '1.8rem',
      color: '#1e3a8a',
    },

    body1: {
      fontSize: '1rem',
      color: '#475569',
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        // Estilos generales para todos los botones
        root: {
          borderRadius: '10px',
          padding: '10px 20px',
        },

        // Solo afecta a variant="contained" color="primary"
        containedPrimary: {
          color: '#ffffff',
          background:
            'linear-gradient(90deg, #1e3a8a 0%, #0a192f 100%)',
          boxShadow: 'none',

          '&:hover': {
            background:
              'linear-gradient(90deg, #0a192f 0%, #1e3a8a 100%)',
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
          },
        },

        // Solo afecta a variant="contained" color="secondary"
        containedSecondary: {
          color: '#ffffff',
          backgroundColor: '#0a192f',
          boxShadow: 'none',

          '&:hover': {
            backgroundColor: '#172a46',
            boxShadow: '0 4px 12px rgba(10, 25, 47, 0.25)',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;