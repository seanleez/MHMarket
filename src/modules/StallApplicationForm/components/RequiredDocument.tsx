import { Box } from '@mui/material';
import React from 'react';
import ImageUploader from './ImageUploader';

const RequiredDocument = () => {
  return (
    <Box>
      <Box
        sx={{
          textTransform: 'uppercase',
          padding: '5px',
          backgroundColor: 'blue',
          color: 'white',
          marginBottom: '30px'
        }}
      >required document</Box>
      
      <ImageUploader />

    </Box>
  );
};

export default RequiredDocument;