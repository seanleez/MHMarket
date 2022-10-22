import { Box, Button, Divider, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RATE_TYPE, STATE_VALUES } from '../../const/const';

const RateForm = (props: any) => {
  const { currentEditRate, onSubmit } = props;
  const [rateType, setRateType] = useState<string>('');

  useEffect(() => {
    console.log(rateType);
  });

  const navigate = useNavigate();
  const isAtEditPage = location.pathname.includes('/rate/edit');

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT RATE' : 'ADD NEW RATE'}
      </span>
      <form onSubmit={onSubmit}>
        <div className="section-title">INFORMATION</div>
        <Box>
          {isAtEditPage && (
            <TextField
              disabled
              name="rate_id"
              label="Rate ID"
              variant="outlined"
              defaultValue={currentEditRate?.user_id ?? ''}
              sx={{ mr: 1 }}
            />
          )}
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditRate?.status ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Divider sx={{ my: '30px' }} />
        <TextField
          required
          select
          name="type"
          label="Rate type"
          defaultValue={currentEditRate?.status ?? ''}
          onChange={(e) => {
            setRateType(e.target.value);
          }}>
          {RATE_TYPE.map((option: any) => (
            <MenuItem key={option.type} value={option.type}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            mt: 4,
          }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/rate-management')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large">
            {isAtEditPage ? 'EDIT RATE' : 'CREATE RATE'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RateForm;
