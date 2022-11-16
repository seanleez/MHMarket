import { Box, Divider, Step, StepLabel, Stepper } from '@mui/material';
import { Container } from '@mui/system';
import React, { ReactNode } from 'react';
import { FormCommonInfor, IFormCommonInfor } from '../components';
import Layout from './Layout';

type IFormContainer  = {
  children: ReactNode;
} & IFormCommonInfor

const steps = [
  'Information',
  'Approval Sumary',
  'Application Fee Payment'
]

const FormContainer = ({ 
  children, 
  status, 
  formNumber, 
  shouldGray, 
  dateSubmitted 
}: IFormContainer) => {

  // 
  return (
    <Layout>
      <Box sx={{ padding: '100px 20px 20px 20px' }}>
        <FormCommonInfor 
          status={status} 
          dateSubmitted={dateSubmitted} 
          formNumber={formNumber} 
          shouldGray={shouldGray} 
        />
        <Divider />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0 20px 0' }}>
          <Box sx={{ maxWidth: 'max-content' }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
        <Divider />
        
        { children }
      </Box>
    </Layout>
  );
};

export default FormContainer;