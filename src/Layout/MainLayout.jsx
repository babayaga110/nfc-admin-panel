// MainContent.jsx
import React from 'react';
import { Box } from '@mui/joy';

const MainContent = ({ children }) => {
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: 'calc(12px + var(--Header-height))',
          sm: 'calc(12px + var(--Header-height))',
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh', // Corrected '100dvh' to '100vh'
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;