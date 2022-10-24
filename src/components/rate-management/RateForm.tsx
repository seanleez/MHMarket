import { Box, Button, Divider, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RATE_TYPE, STATE_VALUES } from '../../const/const';
import OtherRate from './rate-type-component/OtherRate';
import StallRentalRightsRate from './rate-type-component/StallRentalRightsRate';
import StallSecurityRate from './rate-type-component/StallSecurityRate';

const RateForm = (props: any) => {
  const { currentEditRate, onSubmit } = props;
  const [rateType, setRateType] = useState<number>(currentEditRate?.type ?? '');

  const getUIByRateType = (rateType: number) => {
    switch (rateType) {
      case 0:
        return (
          <StallRentalRightsRate
            amounts={currentEditRate?.rental_rate?.class_rental_amounts}
          />
        );
      case 2:
        return <StallSecurityRate currentEditRate={currentEditRate} />;
      case 3:
        return <OtherRate currentEditRate={currentEditRate} />;
      default:
        return (
          <StallRentalRightsRate
            amounts={currentEditRate?.rights_rate?.class_rights_amounts}
          />
        );
    }
  };

  const navigate = useNavigate();
  const isAtEditPage = location.pathname.includes('/rate/edit');

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT RATE' : 'ADD NEW RATE'}
      </span>
      <form onSubmit={(e: React.FormEvent) => onSubmit(e, rateType)}>
        <Box>
          {isAtEditPage && (
            <TextField
              disabled
              name="rate_id"
              label="Rate ID"
              variant="outlined"
              defaultValue={currentEditRate?.rate_id ?? ''}
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
          value={rateType}
          onChange={(e) => {
            setRateType(Number(e.target.value));
          }}>
          {RATE_TYPE.map((option: any) => (
            <MenuItem key={option.type} value={option.type}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        {getUIByRateType(rateType)}

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
