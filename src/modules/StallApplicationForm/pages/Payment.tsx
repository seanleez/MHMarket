import { Box, Button } from '@mui/material';
import React from 'react';
import FormContainer from '../layouts'

const Payment = () => {
  return (
    <FormContainer
      status='New'
      dateSubmitted='12/10/2022'
      formNumber='022'
      shouldGray={false}

      step={2}
    >
      
      <Box
        sx={{
          margin: '100px 0 20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          '& button' : {
            margin: '0 10px'
          }
        }}
      >
        <Button size='small' variant='outlined' >Back</Button>
        <Button size='small' variant='outlined' >Close</Button>
      </Box>
    </FormContainer>
  );
};

export default Payment;