import { Box, Button } from '@mui/material';
import React from 'react';
import { FormCommonInfor, FormOwnerDetailInfor, FormOwnerGeneralInfor } from '../components';
import FormContainer from '../Layouts';

const BlankInfomationStallForm = () => {
  return (
    <FormContainer
      status='New'
      dateSubmitted='12/10/2022'
      formNumber='022'
      shouldGray={false}
    >
      <FormOwnerGeneralInfor />
      <FormOwnerDetailInfor />

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
        <Button size='small' variant='outlined' >Save As Draft</Button>
        <Button size='small' variant='contained' >Submit And Continue</Button>
      </Box>
    </FormContainer>
  );
};

export default BlankInfomationStallForm;