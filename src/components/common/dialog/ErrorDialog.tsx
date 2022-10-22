import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import ErrorIcon from '../../../assets/icon/error-icon.svg';

interface IDialog {
  openProp: boolean;
  message?: string;
  onCloseDialog: () => void;
}

const ErrorDialog: React.FC<IDialog> = (props) => {
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
            paddingTop: '20px',
            py: 4,
          }}>
          <img
            src={ErrorIcon}
            alt={ErrorIcon}
            style={{ width: '55px', height: '55px' }}
          />
        </DialogContent>
        <DialogTitle sx={{ paddingTop: 0, paddingBottom: '20px' }}>
          {message}
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onCloseDialog} autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorDialog;
