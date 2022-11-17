import React, {  ReactNode } from 'react';
import { Box, InputLabel } from '@mui/material';

interface IHOCLabel {
  children: ReactNode;
  id: string;
  label: string;
}


const HOCLabel = ({ children, id, label }: IHOCLabel) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
      <InputLabel shrink htmlFor={id} sx={{ color: 'black' }}>
        {label}
      </InputLabel>
      {
          children
      }
    </Box>
  );
};

export default HOCLabel;