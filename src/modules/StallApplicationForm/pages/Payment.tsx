import CustomField from '@components/common/lease-and-application/CustomField';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { IStallFormShared } from '.';
import { PAYMENT_METHODS } from '../../../const/const';
import { TPair } from '../../../const/interface';
import ImageUploader from '../components/ImageUploader';
import FormContainer from '../layouts';
import { useStallData } from './EditStallApplication';

const Payment = (props: IStallFormShared) => {
  const { applicationInfor } = useStallData();
  const [paymentMethod, setPaymentMethod] = useState<number>(
    applicationInfor.payment_method || PAYMENT_METHODS[0].value
  );

  const labelValuePair: TPair[] = useMemo(() => {
    return [
      {
        label: 'Payment Due Date',
        value: applicationInfor?.reminded_payment_date,
        isDateField: true,
      },
      { label: 'Market Name', value: applicationInfor?.market_name },
      { label: 'Stall Number', value: applicationInfor?.stall_number },
      { label: 'Name', value: applicationInfor?.reminded_payment_date },
      {
        label: 'Nature of Payment',
        value: 'Application Form - New Stall',
      },
      { label: 'Rate', value: '---' },
      {
        label: 'Amount',
        value:
          applicationInfor?.initial_fee === undefined
            ? ''
            : applicationInfor?.initial_fee + ' $',
      },
      {
        label: 'Total amount Due',
        value:
          applicationInfor?.total_amount_due === undefined
            ? ''
            : applicationInfor?.total_amount_due + ' $',
      },
    ];
  }, [applicationInfor]);

  return (
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
          Payment Verification. If your payment is unsuccessful (eg: cancelled,
          declined, etc.), your application will be saved but the status will
          remain to be In Progress. You have the following option:
        </Typography>
        <Typography sx={{ textIndent: '50px' }}>
          1. Click the Submit button again and try paying online.
        </Typography>
        <Typography sx={{ textIndent: '50px' }}>
          2. Update your mode of payment to Manual. You may pay to the market
          collector or you may go to the City Treasurer’s Office to pay for your
          fees.
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
        <Button variant="contained" size="small">
          Submit
        </Button>
        {paymentMethod === 2 && (
          <Box sx={{ margin: '20px 0' }}>
            <Typography sx={{ marginBottom: '10px' }}>
              Proof of Transfer
            </Typography>
            <ImageUploader />
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
          <Button size="small" variant="outlined">
            Close
          </Button>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default Payment;
