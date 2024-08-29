// src/theme.ts
import { createTheme } from '@mui/material/styles';

const starWarsTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(69, 108, 246)',
      contrastText: '#e0e0e0',
    },
    secondary: {
      main: '#ffe81f',
      contrastText: '#1a1a1a',
    },
    error: {
      main: 'rgb(222, 50, 42)', 
    },
    background: {
      default: '#2c2c2c', 
      paper: 'rgb(51, 51, 51, 0.6)', // Slightly lighter grey for Paper components
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#bdbdbd',
      disabled: '#bdbdbd'
    },
    action: {
      active: '#f4a261', // Tatooine sand for active buttons
      hover: '#ffb74d', // Slightly lighter sand color on hover
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
    h4: {
      fontWeight: 700,
      color: '#e0e0e0', // Imperial white for headings
    },
    body1: {
      fontSize: '1rem',
      color: '#e0e0e0',
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
      color: '#ffffff',
    },
  },
  shape: {
    borderRadius: 4, // A subtle rounding of corners
  },
});

export default starWarsTheme;
