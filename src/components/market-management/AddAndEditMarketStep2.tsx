import { Button, Container } from '@mui/material';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { rootURL } from '../../const/const';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import ProgressCirle from '../common/progress-circle/ProgressCircle';
import FloorList from './Step2/FloorList';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const AddAndEditMarketStep2: React.FC = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

  const errMess = useRef<string>('asdasd');

  const navigate = useNavigate();
  const location = useLocation();
  const isAtEditPage = location.pathname.includes('/market/edit');

  const handlePublish = () => {
    const marketId = localStorage.getItem('marketId') ?? '';
    fetch(`${rootURL}/markets/${marketId}/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          throw new Error(response.error_description);
        } else {
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        errMess.current = err.message;
        setOpenErrorDialog(true);
      });
  };

  return (
    <div className="container">
      <span className="title">
        {isAtEditPage ? 'EDIT MARKET' : 'ADD NEW MARKET'}
      </span>
      <ProgressCirle step={2} />
      <div className="section-title">FLOOR PLAN</div>

      <FloorList />

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}>
        <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={handlePublish}>
          Publish
        </Button>
      </Container>
      <SuccessDialog
        openProp={openSuccessDialog}
        message={'Publish Successfully'}
        onCloseDialog={() => setOpenSuccessDialog(false)}
      />
      <ErrorDialog
        openProp={openErrorDialog}
        message={errMess.current}
        onCloseDialog={() => setOpenErrorDialog(false)}
      />
    </div>
  );
};

export default AddAndEditMarketStep2;
