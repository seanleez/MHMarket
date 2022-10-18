import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface IDialog {
  openProp: boolean;
  message?: string;
  onCloseDialog: () => void;
  onAcceptDialog: () => void;
}

const ConfirmDialog: React.FC<IDialog> = (props) => {
  const { openProp, message, onCloseDialog, onAcceptDialog } = props;

  return (
    <div>
      <Dialog
        open={openProp}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>{message}</DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onCloseDialog} autoFocus variant="outlined">
            Cancel
          </Button>
          <Button onClick={onAcceptDialog} autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
