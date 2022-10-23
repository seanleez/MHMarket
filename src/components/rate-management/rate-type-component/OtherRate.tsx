import { Box, MenuItem, TextField } from '@mui/material';
import { OTHER_RATE_DETAIL } from '../../../const/const';

const OtherRate = (props: any) => {
  const { currentEditRate } = props;
  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        required
        select
        name="detail"
        label="Rate Detail"
        defaultValue={currentEditRate?.other_rate?.detail ?? ''}>
        {OTHER_RATE_DETAIL.map((option: any) => (
          <MenuItem key={option.detail} value={option.detail}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        name="amount"
        label="Amount"
        variant="outlined"
        defaultValue={currentEditRate?.other_rate?.amount ?? ''}
        type="number"
        sx={{ mx: 1 }}
      />
    </Box>
  );
};

export default OtherRate;
