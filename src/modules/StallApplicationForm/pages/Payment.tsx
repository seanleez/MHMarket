import SuccessDialog from '@components/common/dialog/SuccessDialog';
import CustomField from '@components/common/lease-and-application/CustomField';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IStallFormShared } from '.';
import { PAYMENT_METHODS } from '../../../const/const';
import { TPair } from '../../../const/interface';
import applicationApis from '../../../services/applicationsApis';
import ImageUploader from '../components/ImageUploader';
import FormContainer from '../layouts';
import { useStallData } from './EditStallApplication';
import PaymentModal from './PaymentModal';

const Payment = (props: IStallFormShared) => {
  const { commonData } = useStallData();
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<number>(
    commonData.payment_method || PAYMENT_METHODS[0].value
  );

  const isApproved = useRef<boolean | undefined>();

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const labelValuePair: TPair[] = useMemo(() => {
    return [
      {
        label: 'Payment Due Date',
        value: commonData?.reminded_payment_date,
        isDateField: true,
      },
      { label: 'Market Name', value: commonData?.market_name },
      { label: 'Stall Number', value: commonData?.stall_number },
      { label: 'Name', value: commonData?.reminded_payment_date },
      {
        label: 'Nature of Payment',
        value: 'Application Form - New Stall',
      },
      { label: 'Rate', value: '---' },
      {
        label: 'Amount',
        value:
          commonData?.initial_fee === undefined
            ? ''
            : commonData?.initial_fee + ' $',
      },
      {
        label: 'Total amount Due',
        value:
          commonData?.total_amount_due === undefined
            ? ''
            : commonData?.total_amount_due + ' $',
      },
    ];
  }, [commonData]);

  const handleSubmit = () => {
    if (!id) return;
    (async () => {
      try {
        await applicationApis.updateAppPayment(id, commonData);
        setOpenSuccessDialog(true);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleSubmitModal = (comment: string) => {
    const payload = {
      application_id: id,
      comment: comment,
      is_approved: isApproved.current,
    };
    console.log(payload);
    (async () => {
      try {
        await applicationApis.confirmAppPayment(id, payload);
        setOpenSuccessDialog(true);
        navigate('/application-list');
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  return (
    <>
      <FormContainer {...props} shouldGray={false} step={2}>
        <Box
          sx={{
            margin: '20px 0',
            width: '100%',
          }}>
          <h3>ORDER OF PAYMENT</h3>
          <Box sx={{ width: '60%', marginBottom: '50px' }}>
            {labelValuePair.map((pair: TPair, i: number) => (
              <CustomField key={i} pair={pair} />
            ))}
          </Box>
          <Typography>
            Once you submit the application form, you will be redirected to the
            Quezon City’s e-Payment Page. If your payment is successful, your
            application will be submitted and the status will be updated to For
            Payment Verification. If your payment is unsuccessful (eg:
            cancelled, declined, etc.), your application will be saved but the
            status will remain to be In Progress. You have the following option:
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            1. Click the Submit button again and try paying online.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            2. Update your mode of payment to Manual. You may pay to the market
            collector or you may go to the City Treasurer’s Office to pay for
            your fees.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '20px 0',
            }}>
            <h4>Payment Method</h4>
            <TextField
              select
              size="small"
              disabled={commonData?.status === 3}
              value={paymentMethod}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(Number(e.target.value))
              }>
              {PAYMENT_METHODS.map((method: any) => (
                <MenuItem key={method.value} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            variant="contained"
            size="small"
            disabled={commonData?.status === 3}
            onClick={handleSubmit}>
            Submit
          </Button>
          {paymentMethod === 2 && (
            <Box sx={{ margin: '20px 0' }}>
              <Typography sx={{ marginBottom: '10px' }}>
                Proof of Transfer
              </Typography>
              <ImageUploader max={1} name="proof_of_transfer" />
            </Box>
          )}
          <Box
            sx={{
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
            }}>
            <Button size="small" variant="outlined" onClick={props.handleBack}>
              Back
            </Button>
            {commonData?.status === 0 ? (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => {
                    isApproved.current = true;
                    setOpenModal(true);
                  }}>
                  Accept
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => {
                    isApproved.current = false;
                    setOpenModal(true);
                  }}>
                  Reject
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate('/application-list')}>
              Close
            </Button>
          </Box>
        </Box>
      </FormContainer>
      <SuccessDialog
        message="Submit Successfully"
        openProp={openSuccessDialog}
        onCloseDialog={() => {
          setOpenSuccessDialog(false);
          navigate('/application-list');
        }}
      />
      <PaymentModal
        openModal={openModal}
        onCloseModal={() => setOpenModal(false)}
        onSubmitModal={handleSubmitModal}
      />
    </>
  );
};

export default Payment;
