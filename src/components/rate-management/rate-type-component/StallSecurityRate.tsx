import { Box, TextField } from '@mui/material';

const StallSecurityRate = (props: any) => {
  const { currentEditRate } = props;
  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        required
        name="rental_fee"
        label="Rental Fee of Month"
        variant="outlined"
        defaultValue={currentEditRate?.security_bond?.rental_fee ?? ''}
        type="number"
      />
      <TextField
        required
        name="amount"
        label="Security Bond Amount"
        variant="outlined"
        defaultValue={currentEditRate?.security_bond?.amount ?? ''}
        type="number"
        sx={{ mx: 1 }}
      />
    </Box>
  );
};

export default StallSecurityRate;
