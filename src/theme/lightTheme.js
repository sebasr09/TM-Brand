import { createTheme } from "@mui/material";
import Colors from "../constants/Colors";

export default createTheme({
  components: {
    root: {
      border: "0",
      backgroundColor: Colors.light.primaryTransparent,
      borderRadius: " 0.5em",
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root:{
          borderRadius: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.8em',
          fontWeight: '800',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderRadius: '0.5em 0.5em 0 0',
          fontWeight: '600',
          textOverflow: 'ellipsis !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: Colors.light.primary,
          },
        }
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1.4em',
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          '&::-webkit-scrollbar': {
            width: 0 /* Remove scrollbar space */,
            background:
              'transparent' /* Optional: just make scrollbar invisible */,
          }
        }
      }
    }
  },
  palette: {
    mode: 'light',
    background: {
      default: Colors.light.lightGray2,
      paper: Colors.light.white,
      contrastText: Colors.light.accent
    },
    text: {
      primary: Colors.light.primary,
      secondary: Colors.light.primary,
      disabled: Colors.light.lightGray2,
    },
    primary: {
      main: Colors.light.primary,
    },
    secondary: {
      main: '#EFEFEF',
    },
    third: {
      main: Colors.light.backgroundGreen,
      contrastText: Colors.light.primary,
    },
    white: {
      main: Colors.light.white,
      contrastText: Colors.light.primary,
    },
    lightgray: {
      main: Colors.light.lightGray2,
    },
    bluetm:{
      main:'#2A1E70'
    },
    purpletm:{
      main:'#5033C1'
    },
    blacktm:{
      main:'#070707'
    },
    lighttm:{
      main:'#B5ACE8'
    }
  },
  typography: {
    fontFamily:
      '"Montserrat", "Helvetica", "Arial", "Nexa Bold Regular", "Montserrat Bold", "Montserrat-Light", sans-serif, Poppins',
    fontSize: 12,
  },
  status: {
    danger: 'orange',
  },
});