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
            paddingBottom: '0',
          }}>
          <img
            src={ErrorIcon}
            alt={ErrorIcon}
            style={{ width: '55px', height: '55px' }}
          />
        </DialogContent>
        <DialogTitle
          sx={{
            padding: '0 20px 20px',
            minWidth: '200px',
            textAlign: 'center',
          }}>
          {message}
        </DialogTitle>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
          }}>
          <Button
            autoFocus
            variant="contained"
            size="medium"
            onClick={onCloseDialog}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorDialog;
