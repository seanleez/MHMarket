import {
  Box,
  DialogContent,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';

import * as React from 'react';
import { STALL_CLASS, STALL_STATUS, STALL_TYPE } from '../../../const/const';
import './StallDetailDialog.scss';
interface IStallDetailDialog {
  stall: any;
  openProp: boolean;
  onCloseDialog: () => void;
  onSubmit: (e: any) => void;
}

const StallDetailDialog: React.FC<IStallDetailDialog> = (props) => {
  const { stall, openProp, onCloseDialog, onSubmit } = props;
  return (
    <div>
      <Dialog open={openProp} onClose={onCloseDialog}>
        <form onSubmit={onSubmit} className="form-detail-container">
          <DialogTitle className="dialog-detail-infor-title">
            Edit Detail Stall
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box className="field-container">
              <Typography>Stall ID:</Typography>
              <Typography>{stall?.code}</Typography>
            </Box>
            <Box className="field-container">
              <Typography>Stall Number:</Typography>
              <TextField
                required
                size="small"
                name="stall_name"
                variant="outlined"
                defaultValue={stall?.stall_name}
              />
            </Box>
            <Box className="field-container">
              <Typography>Stall Type:</Typography>
              <TextField
                required
                select
                size="small"
                name="stall_type"
                variant="outlined"
                defaultValue={stall?.stall_type ?? STALL_TYPE[0].value}>
                {STALL_TYPE.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className="field-container">
              <Typography>Status:</Typography>
              <TextField
                required
                select
                size="small"
                name="stall_status"
                variant="outlined"
                defaultValue={stall?.stall_status ?? STALL_STATUS[0].value}>
                {STALL_STATUS.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className="field-container">
              <Typography>Area:</Typography>
              <TextField
                size="small"
                name="area"
                variant="outlined"
                defaultValue={stall?.area}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      m<sup>2</sup>
                    </InputAdornment>
                  ),
                }}
                style={{ maxWidth: '30%' }}
              />
            </Box>
            <Box className="field-container">
              <Typography>Location Classification:</Typography>
              <TextField
                required
                select
                size="small"
                name="stall_class"
                variant="outlined"
                defaultValue={stall?.stall_class ?? STALL_CLASS[0].value}>
                {STALL_CLASS.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions className="dialog-actions">
            <Button onClick={onCloseDialog} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default StallDetailDialog;
