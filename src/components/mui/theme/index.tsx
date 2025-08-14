'use client';

import { GlobalStyles, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import React, { PropsWithChildren } from 'react';

import theme from './variables';

// https://mui.com/material-ui/customization/how-to-customize/#4-global-css-override
const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
    })}
  />
);
const MuiThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <InitColorSchemeScript />
      <ThemeProvider defaultMode="system" theme={theme}>
        <CssBaseline />
        {inputGlobalStyles}
        {children}
      </ThemeProvider>
    </>
  );
};

export default MuiThemeProvider;
