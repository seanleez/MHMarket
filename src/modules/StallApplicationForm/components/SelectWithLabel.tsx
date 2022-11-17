import React from 'react';
import { Box, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, SxProps } from '@mui/material';
import HOCLabel from './HOCLabel';

interface ISelectWithLabel {
  label: string;
  id: string;
  value?: string;
  onChange?: (e: SelectChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<any>
  disabled?: boolean;
  options: Record<string, string>;
  placeHolder?: string;
}

const SelectWithLabel = ({ label, id, value, onChange, disabled, sx, options, placeHolder }: ISelectWithLabel) => {
  return (
    <HOCLabel label={label} id={id}>
      <Select
        id={id}
        //@ts-ignore
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={sx}
        size='small'
        input={<OutlinedInput />}
        // renderValue={(selected) => {
        //   console.log(selected)
        //   if (!selected) {
        //     return <>{placeHolder}</>;
        //   }

        //   return <>{selected}</>;
        // }}
      > 
        { placeHolder && <MenuItem value='-1'>{placeHolder}</MenuItem> }
        {
          Object.keys(options).map(key => (
            <MenuItem value={key} key={key}>
              {options[key]}
            </MenuItem>
          ))
        }
      </Select>
    </HOCLabel>
  );
};

export default SelectWithLabel;