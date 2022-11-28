import { IconButton, Tooltip } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignOutIcon from '../../assets/icon/signout-icon.svg';
import { AuthorContext } from '../../context/AuthorContext';
import './Header.scss';
import NavigationDrawer from './NavigationDrawer';

const Header: FC = () => {
  const navigate = useNavigate();
  const authorContext = useContext(AuthorContext);

  const handleLogOut = () => {
    localStorage.clear();
    authorContext.updateCurrentUser();
    navigate('/');
  };

  return (
    <>
      <div className="header-container">
        <div className="left-content">
          <NavigationDrawer />
          <Link to="/home">
            <span className="app-name">MH-Market</span>
          </Link>
        </div>
        <div className="right-content">
          {authorContext.currentUser && (
            <>
              <span>Logged in as: </span>
              <u>
                <strong>
                  {`${authorContext.currentUser?.last_name} ${authorContext.currentUser?.first_name}`}
                </strong>
              </u>
            </>
          )}

          <IconButton sx={{ width: 40, height: 40 }} onClick={handleLogOut}>
            <img src={SignOutIcon} alt="SignOutIcon" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Header;
