import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

export interface IFormCommonInfor {
  shouldGray?: boolean;
  status?: string;
  dateSubmitted?: string;
  formNumber?: string;
}

const itemCenter = {
  padding: '8px',
  display: 'flex',
  alignItems: 'center'
}

const grayInput = {
  '& > .MuiInputBase-sizeSmall': {
    backgroundColor: '#d5d5d5',
  }
}


const FormCommonInfor = ({ shouldGray, status, dateSubmitted, formNumber }: IFormCommonInfor) => {
  return (
    <Box 
      sx={{
        margin: '20px 0',
        // backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {/* left */}
      <Grid container xs={6} md={5}  spacing={2} sx={{
        maxWidth: 'fit-content'
      }}>
        <Grid item xs={5} sx={itemCenter}>
          Application Type:
        </Grid>
        <Grid item xs={7} sx={itemCenter}>
          <Typography sx={{ color: 'green' }}>
            NEW STALL APPLICATION
          </Typography>
        </Grid>
        <Grid item xs={5} sx={itemCenter}>
          Application Status:
        </Grid>
        <Grid item xs={7} sx={itemCenter}>
          <TextField value={status} size='small' disabled sx={shouldGray ? grayInput : {}} />
        </Grid>
      </Grid>

      {/* right */}
      <Grid container xs={6} md={5}  spacing={2} sx={{
        maxWidth: 'fit-content'
      }}>
        <Grid item xs={5} sx={itemCenter}>
          Date Submitted:
        </Grid>
        <Grid item xs={7} sx={itemCenter}>
          <TextField value={dateSubmitted} size='small' disabled sx={shouldGray ? grayInput : {}} />
        </Grid>
        <Grid item xs={5} sx={itemCenter}>
          Application Form Number:
        </Grid>
        <Grid item xs={7} sx={itemCenter}>
          <TextField value={formNumber} size='small' disabled sx={shouldGray ? grayInput : {}} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormCommonInfor;