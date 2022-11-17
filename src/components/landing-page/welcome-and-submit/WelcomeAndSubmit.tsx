import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeAndSubmit.scss';

const WelcomeAndSubmit: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="submit-container">
      <div className="welcome-message">
        <p>
          Welcome to <span className="special-text">MHmarket System</span>!
        </p>
        <p>
          This portal is one of Da Nang's Service initiatives catering to the
          needs of business owners in securing their permits and licenses. You
          may choose from the list of services below:
        </p>
      </div>
      <div className="submit-application">
        <h3>Submit your market lease-related application here!</h3>
        <Button
          variant="contained"
          className="primary"
          onClick={() => navigate('/submit-application')}>
          Submit Application
        </Button>
      </div>
    </div>
  );
};

export default WelcomeAndSubmit;
