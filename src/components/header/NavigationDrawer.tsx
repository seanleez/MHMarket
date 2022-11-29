import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  SwipeableDrawer,
} from '@mui/material';

import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../../assets/icon/menu-icon.svg';
import NestedList from './NestedList';
import HomeIcon from '@mui/icons-material/Home';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaidIcon from '@mui/icons-material/Paid';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PublishIcon from '@mui/icons-material/Publish';
import ApprovalIcon from '@mui/icons-material/Approval';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useContext, useMemo } from 'react';
import { AuthorContext } from '../../context/AuthorContext';

interface ILink {
  title: string;
  url: string;
  icon: React.ReactNode;
  nestedList?: ILink[];
  isPublic: boolean;
}

const NavigationDrawer: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const authorContext = useContext(AuthorContext);
  const navigationLinks: ILink[] = useMemo(() => {
    const permissions = authorContext?.currentUser?.permissions ?? [];
    if (permissions.length === 0) return [];
    return [
      {
        title: 'Home',
        url: '/home',
        icon: <HomeIcon />,
        isPublic: true,
      },
      {
        title: 'System Mantenance',
        nestedList: [
          {
            title: 'Role Management',
            url: '/role-management',
            icon: <ManageSearchIcon />,
            isPublic: permissions.includes('ROLE_MANAGEMENT'),
          },
          {
            title: 'User Management',
            url: '/user-management',
            icon: <ManageAccountsIcon />,
            isPublic: permissions.includes('USER_MANAGEMENT'),
          },
          {
            title: 'Rate Management',
            url: '/rate-management',
            icon: <PaidIcon />,
            isPublic: permissions.includes('RATE_MANAGEMENT'),
          },
        ],
        url: '',
        icon: <SettingsSuggestIcon />,
        isPublic: true,
      },
      {
        title: 'Submit Application',
        url: '/submit-application',
        icon: <PublishIcon />,
        isPublic: permissions.includes('APPLICATION_SUBMIT'),
      },
      {
        title: 'View Application List',
        url: '/application-list',
        icon: <ApprovalIcon />,
        isPublic: permissions.includes('APPLICATION_VIEW'),
      },
      {
        title: 'Lease Management',
        url: '/lease-management',
        icon: <PaymentIcon />,
        isPublic: true,
      },
      {
        title: 'Market Management',
        url: '/market-management',
        icon: <LocalConvenienceStoreIcon />,
        isPublic: permissions.includes('MARKET_VIEW'),
      },
      {
        title: 'Analytics and Report',
        url: '/analytics-reports',
        icon: <SignalCellularAltIcon />,
        isPublic: true,
      },
    ];
  }, [authorContext?.currentUser]);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(!openDrawer);
  };

  const navigationList = () => (
    <Box role="presentation" onKeyDown={toggleDrawer}>
      <List>
        {navigationLinks
          .filter((link: ILink) => link.isPublic)
          .map((item, index) => {
            return item.nestedList ? (
              <NestedList
                key={index}
                title={item.title}
                icon={item.icon}
                nestedList={item.nestedList}
                toggleDrawer={toggleDrawer}
              />
            ) : (
              <ListItem
                key={index}
                disablePadding
                sx={{ ':hover': { backgroundColor: '#d93939' } }}
                onClick={toggleDrawer}>
                <Link
                  to={item.url}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    width: '100%',
                  }}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer}>
          <img src={MenuIcon} alt="MenuIcon" />
        </Button>
        <SwipeableDrawer
          anchor={'left'}
          open={openDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}>
          {navigationList()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default NavigationDrawer;
