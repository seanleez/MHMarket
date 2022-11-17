import { Box, FormControl, InputBase, InputLabel, SxProps, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import HOCLabel from './HOCLabel';

interface IInputWithLabel {
  label: string;
  id: string;
  value?: unknown;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<any>
  disabled?: boolean;
}

const InputWithLabel = ({ label, id, value, onChange, disabled, sx }: IInputWithLabel) => {
  return (
    <HOCLabel label={label} id={id}>
      <TextField
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={sx}
        size='small'
      />
    </HOCLabel>
    
  );
};

export default InputWithLabel;