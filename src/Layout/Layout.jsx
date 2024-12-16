import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline, Box } from '@mui/joy';

import Header from '../components/Navbars/Header';
import Sidebar from '../components/Navbars/Sidebar';
import MainContent from './MainLayout'; // Assuming MainContent is a new component

const Layout = ({ children }) => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}> {/* Corrected '100dvh' to '100vh' */}
        <Header />
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </Box>
    </CssVarsProvider>
  );
};

export default Layout;