import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const MarketFormStep2 = (props: any) => {
  const { onSubmit } = props;
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
      <div className="step-circles-container">
        <div className="step-circle">
          <div className="active">1</div>
          <div>Information</div>
        </div>
        <div className="step-circle">
          <div className="active">2</div>
          <div>Floorplan</div>
        </div>
        <div className="step-circle">
          <div>3</div>
          <div>Review</div>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="section-title">BASIC</div>

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
          <Button type="submit" variant="contained" size="large">
            Publish
          </Button>
        </Container>
      </form>
    </>
  );
};

export default MarketFormStep2;
