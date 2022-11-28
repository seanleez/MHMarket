import { Box, Divider, Grid } from '@mui/material';
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
      
      {/* 1st row */}
      <Grid container spacing={2} sx={{ padding: '20px 0' }}>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3}>
              Proof of Residency:
            </Grid>
            <Grid item xs={12} xl={6}>
              <ImageUploader max={3} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3}>
              Identification:
            </Grid>
            <Grid item xs={12} xl={6}>
              <ImageUploader max={3} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2} sx={{ padding: '20px 0' }}>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3}>
              Birth Certificate:
            </Grid>
            <Grid item xs={12} xl={6}>
              <ImageUploader max={3} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>

      {/* 3rd row */}
      <Grid container spacing={2} sx={{ padding: '20px 0' }}>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3}>
              2x2 Picture:
            </Grid>
            <Grid item xs={12} xl={6}>
              <ImageUploader max={3} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>

    </Box>
  );
};

export default RequiredDocument;