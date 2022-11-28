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

  const currentUser = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') as string)
    : null;
  const handleLogOut = () => {
    localStorage.clear();
    authorContext.updatePermissions('logout', '');
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
          <span>Logged in as: </span>
          <u>
            <strong>
              {currentUser &&
                `${currentUser.user.last_name} ${currentUser.user.first_name}`}
            </strong>
          </u>
          <IconButton sx={{ width: 40, height: 40 }} onClick={handleLogOut}>
            <img src={SignOutIcon} alt="SignOutIcon" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Header;
