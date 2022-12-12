import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { useStallData } from '../pages/EditStallApplication';
dayjs.extend(utc)


export interface IFormCommonInfor {
  shouldGray?: boolean;
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

const status = [
  'New',
  'In Progress',
  'Payment Info Requested',
  'For Payment Verification',
  'Approved',
  'Disapproved',
]

const FormCommonInfor = ({ shouldGray }: IFormCommonInfor) => {

  const { commonData } = useStallData();

  // console.log(commonData.created_at, dayjs.utc(commonData.created_at))

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
      <Grid container spacing={2} sx={{
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
          <TextField value={status[commonData.status]} size='small' disabled sx={shouldGray ? grayInput : {}} />
        </Grid>
      </Grid>

      {/* right */}
      <Grid container  spacing={2} sx={{
        maxWidth: 'fit-content'
      }}>
        <Grid item xs={5} sx={itemCenter}>
          Date Submitted:
        </Grid>
        <Grid item xs={7} sx={itemCenter}>
          <TextField value={dayjs.utc(commonData.created_at).format('MM/DD/YYYY')} size='small' disabled sx={shouldGray ? grayInput : {}} />
        </Grid>
        <Grid item xs={5} sx={itemCenter}>
          Application Form Number:
        </Grid>
        <Grid item xs={7} sx={itemCenter}>
          <TextField value={commonData.code} size='small' disabled sx={shouldGray ? grayInput : {}} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormCommonInfor;