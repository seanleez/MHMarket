import { Box, Divider, Grid, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { ReactNode, useState } from 'react';
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

const FormOwnerGeneralInfor = () => {

  const [sex, setSex] = useState('-1');
  const [status, setStatus] = useState('-1');
  const [dob, setDob] = useState<Dayjs | null>(null)

  const [province, setProvince] = useState('-1');
  const [city, setCity] = useState('-1');
  const [ward, setWard] = useState('-1');



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
          <SelectWithLabel label='Sex:*' id='sex' 
            options={sexOptions} placeHolder='-- Select --' 
            value={sex} 
            onChange={(e) => setSex(e.target.value as string)}
          />
        </Grid>
      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectWithLabel label='Status:*' id='status' 
            options={statusOption} placeHolder='-- Select --' 
            value={status} 
            onChange={(e) => setStatus(e.target.value as string)}
          />
        </Grid>
        <Grid item xs={3}>
          <DatePickerWithLabel label='Date of Birth:*' 
            id='dob' value={dob} onChange={v => setDob(v)} 
          />
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

      {/* 3rd row */}
      <Grid container spacing={2} sx={{ paddingBottom: '100px' }}>
        <Grid item xs={3}>
          <InputWithLabel label='Place of Birth:*' id='pob'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Email Address:*' id='mail'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label="Mother's Name:*" id='mother-name'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label="Father's Name:*" id='father-name'/>
        </Grid>
      </Grid>

      <Divider />

      <Typography sx={{ fontWeight: 'bold', margin: '10px 0 20px 0' }}>
        Address:
      </Typography>
      {/* 1st row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <InputWithLabel label='House Number:' id='house-number'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Street:' id='street'/>
        </Grid>
        <Grid item xs={3}>
          <SelectWithLabel label='Province:' id='province' 
            options={{ '0': 'from API', '1': 'from API' }} placeHolder='-- Select --' 
            value={province} 
            onChange={(e) => setProvince(e.target.value as string)}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectWithLabel label='City/Municipality:' id='city' 
            options={{ '0': 'from API', '1': 'from API' }} placeHolder='-- Select --' 
            value={city} 
            onChange={(e) => setCity(e.target.value as string)}
          />
        </Grid>
      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2} sx={{ marginBottom: '50px' }}>
        <Grid item xs={3}>
          <SelectWithLabel label='Ward:*' id='ward' 
            options={{ '0': 'from API', '1': 'from API' }} placeHolder='-- Select --' 
            value={ward} 
            onChange={(e) => setWard(e.target.value as string)}
          />
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Zip Code:' id='zip-code'/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='District:' id='district'/>
        </Grid>
        
      </Grid>

      <Divider />
    </Box>
  );
};

export default FormOwnerGeneralInfor;