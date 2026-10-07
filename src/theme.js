import { createTheme } from '@mui/material/styles'

export const gradient = 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)'

export const collectionColors = {
  pink: '#ec4899',
  teal: '#14b8a6',
  purple: '#a855f7',
  gold: '#eab308',
  blue: '#3b82f6',
  red: '#f43f5e',
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6d28d9',
    },
    secondary: {
      main: '#ec4899',
    },
    background: {
      default: '#050505',
      paper: 'rgba(20, 20, 25, 0.65)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          border: 'none',
          boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.5)',
            background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,0.03)',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255,255,255,0.06)',
            boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(255,255,255,0.08)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(15, 15, 20, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundImage: 'none',
        },
      },
    },
  },
})
