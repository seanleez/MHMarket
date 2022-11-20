import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import ConfirmationIcon from '../../../assets/icon/confirmation-icon.svg';

interface IDialog {
  openProp: boolean;
  message?: string;
  onCloseDialog: () => void;
}

const AlertDialog: React.FC<IDialog> = (props) => {
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
            src={ConfirmationIcon}
            alt={ConfirmationIcon}
            style={{ width: '100px', height: '100px' }}
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
          <Button onClick={onCloseDialog} autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
