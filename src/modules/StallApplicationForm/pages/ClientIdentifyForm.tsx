import { Box, Button } from '@mui/material';
import React from 'react';
import { IStallFormShared } from '.';
import { RequiredDocument } from '../components';
import FormContainer from '../layouts';


const ClientIdentifyForm = (props: IStallFormShared) => {
  return (
    <FormContainer
      {...props}
      shouldGray={false}
    >
      <RequiredDocument />

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
        <Button size='small' variant='outlined' >Cancel</Button>
        {/* <Button size='small' variant='outlined' >Save As Draft</Button> */}
        <Button size='small' variant='contained' >Submit And Continue</Button>
      </Box>
    </FormContainer>
  );
};

export default ClientIdentifyForm;