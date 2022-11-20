import { Button, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { rootURL } from '../../const/const';
import SuccessDialog from '../common/dialog/SuccessDialog';
import ProgressCirle from '../common/progress-circle/ProgressCircle';
import FloorList from './Step2/FloorList';

const marketId = localStorage.getItem('marketId');
const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const MarketFormStep2 = (props: any) => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const isAtEditPage = location.pathname.includes('/market/edit');
  const navigate = useNavigate();

  const handlePublish = () => {
    fetch(`${rootURL}/markets/${marketId}/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setOpenSuccessDialog(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
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
    </>
  );
};

export default MarketFormStep2;
