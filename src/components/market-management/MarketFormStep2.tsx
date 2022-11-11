import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressCirle from '../common/progress-circle/ProgressCircle';
import FloorList from './Step2/FloorList';

const MarketFormStep2 = (props: any) => {
  const { listFloors, onSubmit, onAddNew, onEdit, onDelete, onPublish } = props;
  const isAtEditPage = location.pathname.includes('/market/edit');

  const navigate = useNavigate();
  const params = useParams();
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT MARKET' : 'ADD NEW MARKET'}
      </span>
      <ProgressCirle step={2} />
      <div className="section-title">FLOOR PLAN</div>

      <FloorList listFloors={listFloors} />

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate(`/market/edit/step1/${params.id}`)}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={onPublish}>
          Publish
        </Button>
      </Container>
    </>
  );
};

export default MarketFormStep2;
