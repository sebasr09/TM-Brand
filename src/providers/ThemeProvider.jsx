import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
import darkTheme from '../theme/darkTheme';
import lightTheme from '../theme/lightTheme';
import PropTypes from 'prop-types';

const TMThemeContext = createContext(undefined);

export const TMThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const changeMode = (mode) => {
    setMode(mode);
  };

  return (
    <TMThemeContext.Provider value={{ mode, changeMode }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </TMThemeContext.Provider>
  );
};

TMThemeProvider.propTypes = {
  children: PropTypes.object,
};

export const useThemeContext = () => {
  const context = useContext(TMThemeContext);

  if (context === undefined) {
    throw new Error(
      'Attempting to read ToastContext outside a Provider heirarchy'
    );
  }
  return context;
};
