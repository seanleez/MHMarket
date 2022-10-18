import { Button } from '@mui/material';
import { FC } from 'react';
import './Features.scss';

const Features: FC = () => {
  return (
    <div className="features">
      <div className="feature-container">
        <div className="feature-infor">
          <h3>Have you submited your application for new or renewal stall?</h3>
          <p>Manage Market Information here:</p>
        </div>
        <div className="feature-go-to">
          <Button variant="outlined">View Application Status</Button>
        </div>
      </div>
      <div className="feature-container">
        <div className="feature-infor">
          <h3>Do you need to view you existing market lease?</h3>
          <p>Manage your Market Lease here:</p>
        </div>
        <div className="feature-go-to">
          <Button variant="outlined">Manage Market Lease</Button>
        </div>
      </div>
      <div className="feature-container">
        <div className="feature-infor">
          <h3>
            Know the current market trends and view market-related metrics here:
          </h3>
          <p>Manage your reports and analytics:</p>
        </div>
        <div className="feature-go-to">
          <Button variant="outlined">View Market Reports and Analytics</Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
