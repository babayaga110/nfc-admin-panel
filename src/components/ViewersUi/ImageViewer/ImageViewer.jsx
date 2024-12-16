import { Box } from '@mui/joy';
import * as React from 'react';

export default function ImageViewer({ src, alt = "Image" }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} // Ensures image scales well
      />
    </Box>
  );
}
