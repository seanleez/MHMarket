import { Box, Typography } from '@mui/material';
import React from 'react';
import EditableDependentTable from './EditableDependentTable';

function FormOwnerDetailInfor() {
  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold', margin: '10px 0 0 0' }}>
        Child/ren and/or dependents:
      </Typography>
      <Typography sx={{  fontSize: '14px', color: '#6c6c6c', fontStyle: 'italic', margin: '0 0 20px 0' }}>
        If none, kindly indicate "none" in the textbox.
      </Typography>
      {/* 1st row */}
      <EditableDependentTable />
    </Box>
  );
}

export default FormOwnerDetailInfor;