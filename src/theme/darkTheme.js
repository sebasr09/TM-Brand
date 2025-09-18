import { createTheme } from "@mui/material";
import Colors from "../constants/Colors";

export default createTheme({
  components: {
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
          fontWeight: '600',
          textOverflow: 'ellipsis !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: Colors.dark.lightGray,
          },
        },
        notchedOutline: {
          borderColor: Colors.dark.white,
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px rgb(46, 46, 99) inset`,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: Colors.dark.white,
          },
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1.4em',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          '&::-webkit-scrollbar': {
            width: 0 /* Remove scrollbar space */,
            background:
              'transparent' /* Optional: just make scrollbar invisible */,
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    text: {
      primary: Colors.dark.white,
      secondary: Colors.dark.lightGray,
      disabled: Colors.dark.lightGray2,
    },
    primary: {
      main: Colors.dark.primary,
      dark: Colors.dark.primaryTransparent,
      contrastText: Colors.dark.lightGray2,
    },
    secondary: {
      main: Colors.dark.secondary,
      contrastText: Colors.dark.yellow,
    },
    action: {
      selected: Colors.dark.backgroundGreen,
      focus: Colors.dark.lightGray,
    },
    third: {
      main: Colors.dark.backgroundGreen,
      contrastText: Colors.dark.white,
    },
    background: {
      default: Colors.dark.primary,
      paper: Colors.dark.secondary,
    },
    white: {
      main: Colors.dark.white,
      contrastText: Colors.dark.primary,
    },
    lightgray: {
      main: Colors.dark.lightGray2,
    },
  },
  typography: {
    fontFamily:
      '"Montserrat", "Helvetica", "Arial", "Nexa Bold Regular", "Montserrat Bold", "Montserrat-Light", sans-serif',
    fontSize: 12,
  },
  status: {
    danger: 'orange',
  },
});