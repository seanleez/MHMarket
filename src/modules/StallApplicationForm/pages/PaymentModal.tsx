import { DialogContent, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import SuccessIcon from '../../../assets/icon/success-icon.svg';

interface IPaymentModal {
  openModal: boolean;
  onCloseModal: () => void;
  onSubmitModal: (comment: string) => void;
}

const PaymentModal: React.FC<IPaymentModal> = (props) => {
  const { openModal, onCloseModal, onSubmitModal } = props;
  const [comment, setComment] = React.useState<string>('');

  React.useEffect(() => {
    setComment('');
  }, [openModal]);

  return (
    <Dialog open={openModal} onClose={onCloseModal}>
      <DialogContent>
        <Typography>Comment:</Typography>
        <TextField
          multiline
          rows={4}
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          sx={{ textAlign: 'left', minWidth: '500px' }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '20px',
        }}>
        <Button variant="outlined" size="small" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => onSubmitModal(comment)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
