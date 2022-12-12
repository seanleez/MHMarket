import SuccessDialog from '@components/common/dialog/SuccessDialog';
import { Box, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IStallFormShared } from '.';
import applicationApis from '../../../services/applicationsApis';
import { FormOwnerDetailInfor, FormOwnerGeneralInfor } from '../components';
import FormContainer from '../layouts';
import { useStallData } from './EditStallApplication';

const BlankInfomationStallForm = (props: IStallFormShared) => {
  const { commonData, setCommonData } = useStallData();

  //
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    isDraft: false,
  });

  const handleCloseModal = (isDraft: boolean) => {
    setModal({
      open: false,
      isDraft: false,
    });
    if (isDraft) {
      navigate('/application-list');
    } else {
      props.handleNext();
    }
  };

  //

  const dependentTableRef = useRef<unknown>();

  const submit = (isDraft = false) => {
    (async () => {
      try {
        let res: any;
        if (commonData.application_id) {
          res = await applicationApis.updateApplication(commonData, isDraft);
        } else {
          res = await applicationApis.submitApplication(commonData, isDraft);
        }
        if (!isDraft) {
          setCommonData((draft: any) => {
            draft = { ...draft, ...res.data };
            return draft;
          });
        }
        setModal({
          open: true,
          isDraft,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  return (
    <FormContainer {...props} shouldGray={false}>
      <FormOwnerGeneralInfor />
      <FormOwnerDetailInfor tableRef={dependentTableRef} />
      <SuccessDialog
        openProp={modal.open}
        message="Submit Successfully!"
        onCloseDialog={() => handleCloseModal(modal.isDraft)}
      />
      <Box
        sx={{
          margin: '100px 0 20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          '& button': {
            margin: '0 10px',
          },
        }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => props.handleBack()}>
          Cancel
        </Button>
        {commonData?.status !== 3 && (
          <>
            <Button
              size="small"
              variant="outlined"
              onClick={() => submit(true)}>
              Save As Draft
            </Button>
            <Button size="small" variant="contained" onClick={() => submit()}>
              Submit And Continue
            </Button>
          </>
        )}
        {(commonData?.status === 2 || commonData?.status === 3) && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => props.handleNext()}>
            Next
          </Button>
        )}
      </Box>
    </FormContainer>
  );
};

export default BlankInfomationStallForm;
