import { Box } from '@mui/material';
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
    </FormContainer>
  );
};

export default BlankInfomationStallForm;