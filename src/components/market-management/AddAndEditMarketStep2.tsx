import { Button, Container } from '@mui/material';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import marketApis from '../../services/marketApis';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import ProgressCirle from '../common/progress-circle/ProgressCircle';
import FloorList from './Step2/FloorList';

const AddAndEditMarketStep2: React.FC = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

  const errMess = useRef<string>('asdasd');

  const navigate = useNavigate();
  const location = useLocation();
  const isAtEditPage = location.pathname.includes('/market/edit');

  const handlePublish = () => {
    const marketId = localStorage.getItem('marketId') ?? '';
    (async () => {
      try {
        await marketApis.publishMarket(marketId);
        setOpenSuccessDialog(true);
      } catch (error) {
        errMess.current = error as string;
        setOpenErrorDialog(true);
      }
    })();
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
        onCloseDialog={() => {
          setOpenSuccessDialog(false);
          navigate('/submit-application');
        }}
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
