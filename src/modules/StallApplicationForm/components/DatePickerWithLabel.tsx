import React from 'react';
import HOCLabel from './HOCLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Dayjs } from 'dayjs';
import { SxProps, TextField } from '@mui/material';

interface IDatePickerWithLabel {
  label: string;
  id: string;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  sx?: SxProps<any>
  disabled?: boolean;
}

const DatePickerWithLabel = ({ label, id, value, onChange, sx, disabled }: IDatePickerWithLabel) => {
  return (
    <HOCLabel label={label} id={id}>
      <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
          disabled={disabled}
        />
    </HOCLabel>
  );
};

export default DatePickerWithLabel;