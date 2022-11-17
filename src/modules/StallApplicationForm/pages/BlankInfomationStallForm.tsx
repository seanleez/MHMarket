import { Box } from '@mui/material';
import React from 'react';
import { FormCommonInfor, FormOwnerInfor } from '../components';
import FormContainer from '../Layouts';

const BlankInfomationStallForm = () => {
  return (
    <FormContainer
      status='New'
      dateSubmitted='12/10/2022'
      formNumber='022'
      shouldGray={true}
    >
      <FormOwnerInfor />
    </FormContainer>
  );
};

export default BlankInfomationStallForm;