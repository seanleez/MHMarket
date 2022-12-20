import { Button } from '@mui/material';
import {FC, useContext} from 'react';
import { Link } from 'react-router-dom';
import './Features.scss';
import { AuthorContext } from '../../../context/AuthorContext';

// @ts-ignore
const Features: FC = () => {
  const authorContext = useContext(AuthorContext);
  const permissions = authorContext?.currentUser?.permissions ?? [];
  if (permissions.length === 0) return [];
  return (
    <div className="features">
      {permissions.includes('APPLICATION_VIEW') &&<div className="feature-container">
        <div className="feature-infor">
          <h3>Have you submited your application for new or renewal stall?</h3>
          <p>Manage Market Information here:</p>
        </div>
        <div className="feature-go-to">
          <Link to="/application-list" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">View Application Status</Button>
          </Link>
        </div>
      </div>}
      {permissions.includes('MARKET_LEASE_VIEW') &&  <div className="feature-container">
        <div className="feature-infor">
          <h3>Do you need to view you existing market lease?</h3>
          <p>Manage your Market Lease here:</p>
        </div>
        <div className="feature-go-to">
          <Link to="/lease-management" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Manage Market Lease</Button>
          </Link>
        </div>
      </div>}
      {permissions.includes('VIEW_ANALYTICS') && <div className="feature-container">
        <div className="feature-infor">
          <h3>
            Know the current market trends and view market-related metrics here:
          </h3>
          <p>Manage your reports and analytics:</p>
        </div>
        <div className="feature-go-to">
          <Button variant="outlined">View Market Reports and Analytics</Button>
        </div>
      </div> }
    </div>
  );
};

export default Features;
