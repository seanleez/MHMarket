import { Box, Button } from '@mui/material';
import React from 'react';
import { IStallFormShared } from '.';
import applicationApis from '../../../services/applicationsApis';
import { RequiredDocument } from '../components';
import FormContainer from '../layouts';
import { useStallData } from './EditStallApplication';

const ClientIdentifyForm = (props: IStallFormShared) => {

  const { commonData, setCommonData } = useStallData();

  const submit = (isDraft = false) => {
    (async () => {
      try {
        const res = await applicationApis.updateApplication(commonData, isDraft)
        setCommonData(draft => {
          draft = { ...draft, ...res.data } 
        })
        // next
        props.handleNext();

      } catch (e) {
        console.log(e)
      }
    })();
  }

  return (
    <FormContainer {...props} shouldGray={false}>
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
        <Button size='small' variant='outlined' onClick={() => props.handleBack()} >Back</Button>
        <Button size='small' variant='outlined' onClick={() => submit(true)} >Save As Draft</Button>
        <Button size='small' variant='contained' onClick={() => submit()} >Submit And Continue</Button>
      </Box>
    </FormContainer>
  );
};

export default ClientIdentifyForm;
