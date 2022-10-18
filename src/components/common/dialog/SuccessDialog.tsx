import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import SuccessIcon from '../../../assets/icon/success-icon.svg';

interface IDialog {
  openProp: boolean;
  message?: string;
  onCloseDialog: () => void;
}

const SuccessDialog: React.FC<IDialog> = (props) => {
  const { openProp, message, onCloseDialog } = props;

  return (
    <div>
      <Dialog
        open={openProp}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 0,
          }}>
          <img
            src={SuccessIcon}
            alt={SuccessIcon}
            style={{ width: '100px', height: '100px' }}
          />
        </DialogContent>
        <DialogTitle
          sx={{
            pt: 0,
          }}>
          {message}
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={onCloseDialog}
            autoFocus
            variant="contained"
            size="small">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SuccessDialog;
