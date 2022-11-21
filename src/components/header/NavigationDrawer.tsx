import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
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
import { NAVIGATION_LIST } from '../../const/const';
import NestedList from './NestedList';

const NavigationDrawer: React.FC = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    console.log('click');

    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(!state);
  };

  const navigationList = () => (
    <Box role="presentation" onKeyDown={toggleDrawer}>
      <List>
        {NAVIGATION_LIST.map((item, index) => {
          return item.nestedList ? (
            <NestedList
              key={index}
              title={item.title}
              icon={item.icon}
              nestedList={item?.nestedList}
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
          open={state}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}>
          {navigationList()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default NavigationDrawer;
