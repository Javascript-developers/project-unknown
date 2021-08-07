import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Image } from 'cloudinary-react';
import { deepOrange } from '@material-ui/core/colors';
import { blueGrey } from '@material-ui/core/colors';

import logo from '../../assets/logo.png';

import {
  IconButton,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Container,
  AppBar,
  Box,
  InputBase,
  Badge,
} from '@material-ui/core';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import BookIcon from '@material-ui/icons/Book';
// import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
// import Link from '@material-ui/core/Link';

import SearchBar from './SearchBar';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user/user-actions';
// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({}));
// import useStyles from '../../styles/layout/navbar.styles.js';
const navItem = {
  marginLeft: '15px',
  // '&:hover': {
  //   border: '5px solid red',
  //   // borderRadius: '50%',
  //   // padding: '5px',
  // },
};

const notificationItems = {
  display: 'flex',
  color: blueGrey[800],
  margin: '0 15px 0 30px',
};

const Navbar = (props) => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <NavLink>
      <div>
        <Button
          component={Link}
          to={'/new'}
          variant="contained"
          color="primary"
          size="small"
          sx={{ color: '#e2e2e2' }}
        >
          Create Post
        </Button>
      </div>
      <div style={notificationItems}>
        <Link to="/messenger">
          <IconButton>
            <Badge color="secondary" badgeContent={1}>
              <MailOutlineIcon />
            </Badge>
          </IconButton>
        </Link>

        <IconButton>
          <Badge color="secondary" badgeContent={1}>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </div>

      <div>
        <div style={navItem}>
          <Box
            onClick={handleOpenMenu}
            sx={{
              border: '4px solid transparent',
              borderRadius: '50%',
              padding: '1px',
              '&:hover': {
                border: `4px solid ${blueGrey[50]}`,
                cursor: 'pointer',
              },
            }}
          >
            <Avatar
              alt="user avatar"
              sx={{
                bgcolor: deepOrange[500],
                width: 35,
                height: 35,
              }}
            >
              {currentUser && currentUser.avatar ? (
                <Image
                  cloudName="dsmrt6yiw"
                  publicId={currentUser.avatar}
                  width="100%"
                  // crop="scale"
                />
              ) : null}
            </Avatar>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorMenu)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>
              <Link to="/about">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link to="/settings">Settings</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              {/* <Link to="/bookmarks">Bookmarks</Link> */}
              Bookmarks
            </MenuItem>

            <MenuItem onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </NavLink>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        // backgroundColor: (theme) => theme.palette.background.paper,
        bgcolor: 'background.paper',
        borderBottom: '1px solid #e2e2e2',
        // p: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Link to="/">
            <img src={logo} style={{ height: '40px' }} />
          </Link>
          <SearchBar />
          <div style={{ flexGrow: 1 }}></div>
          {/* <BookIcon />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            My Blog
          </Typography> */}

          <div>{isAuthenticated && authLinks}</div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

// Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.string.isRequired,
// };

// Navbar.defaultProps = {
//   title: 'My Blog',
//   icon: 'fas fa-blog',
// };

const NavLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 1;
//   width: 100%;
//   border-bottom: solid 1px rgb(142, 208, 249);
//   opacity: 0.9;
//   margin-bottom: 1rem;
//   padding: 0.7rem 2rem;
//   background: rgb(29, 161, 242);
//   color: white;
//   a {
//     text-decoration: none;
//     color: white;
//     &:hover {
//       color: grey;
//     }
//   }
// `;

// const ListContainer = styled.ul`
//   list-style: none;
//   display: flex;
//   text-align: center;
//   justify-content: center;
// `;
// const ListItem = styled.li`
//   margin: 0 20px;
// `;

// const ListAvatarItem = styled.li`
//   margin: 0 20px;
//   color: white;
//   cursor: pointer;
// `;
