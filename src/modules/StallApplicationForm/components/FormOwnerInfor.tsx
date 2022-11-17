import { Box, Divider, Grid, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import DatePickerWithLabel from './DatePickerWithLabel';
import InputWithLabel from './InputWithLabel';
import SelectWithLabel from './SelectWithLabel';


const sexOptions = {
  '0': 'Male',
  '1': 'Female',
}

const statusOption = {
  '0': 'Single',
  '1': 'Married',
  '2': 'Separated',
  '3': 'Widow',
}

const FormOwnerInfor = () => {

  const [sex, setSex] = useState('-1');
  const [status, setStatus] = useState('-1');
  const [dob, setDob] = useState<Dayjs | null>(null)

  return (
    <Box>
      {/* Stall infor */}
      <Grid container spacing={2} sx={{ margin: '20px 0 20px 0' }}>
        <Grid item xs={4}>
          <InputWithLabel label='Market Name:' disabled={true} id='market-name' />
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Stall Number:' disabled={true} id='stall-number' />
        </Grid>
        <Grid item xs={2}>
          <InputWithLabel label='Stall Size:' disabled={true} id='stall-size' />
        </Grid>
      </Grid>
      <Divider />

      {/* owner infor */}
      <Typography sx={{ fontWeight: 'bold', margin: '10px 0 20px 0' }}>
        Information:
      </Typography>
      {/* 1st row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <InputWithLabel label='Last Name:*' id='last-name'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='First Name:*' id='first-name'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Middle Name:*' id='middle-name'/>
        </Grid>
        <Grid item xs={3}>
          <SelectWithLabel label='Sex:*' id='sex' options={sexOptions} placeHolder='-- Select --' value={sex} onChange={(e) => setSex(e.target.value as string)}/>
        </Grid>
      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectWithLabel label='Status:*' id='status' options={statusOption} placeHolder='-- Select --' value={status} onChange={(e) => setStatus(e.target.value as string)}/>
        </Grid>
        <Grid item xs={3}>
          <DatePickerWithLabel label='Date of Birth:*' id='dob' value={dob} onChange={v => setDob(v)} />
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={4}>
              <InputWithLabel label='Age:' id='age' disabled={true} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Telephone:*' id='tel' />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormOwnerInfor;