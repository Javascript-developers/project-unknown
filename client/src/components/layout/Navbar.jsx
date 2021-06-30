import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Image } from 'cloudinary-react';
import { deepOrange } from '@material-ui/core/colors';

import AppBar from '@material-ui/core/AppBar/index';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
// import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user/user-actions';

const Navbar = (props) => {
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
    console.log('lol');
  };

  const authLinks = (
    <Fragment>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem>
        <Button
          component={Link}
          to={'/new'}
          variant="contained"
          color="secondary"
        >
          Create Post
        </Button>
      </ListItem>
      <ListAvatarItem>
        <div>
          <div onClick={handleOpenMenu}>
            <Avatar
              alt="user avatar"
              sx={{ bgcolor: deepOrange[500], width: 50, height: 50 }}
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
            {/* {currentUser ? currentUser.name : null} */}
          </div>
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
              <Link to="/edit-profile">Edit Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            <MenuItem onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>Logout
            </MenuItem>
          </Menu>
        </div>
      </ListAvatarItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ListItem>
        <Link to="/login">Login</Link>
      </ListItem>
      <ListItem>
        <Link to="/register">Register</Link>
      </ListItem>
    </Fragment>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <BookIcon />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>
        <ListContainer>
          {isAuthenticated ? authLinks : guestLinks}
        </ListContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'My Blog',
  icon: 'fas fa-blog',
};

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

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  text-align: center;
  justify-content: center;
`;
const ListItem = styled.li`
  margin: 0 20px;
`;

const ListAvatarItem = styled.li`
  margin: 0 20px;
  color: white;
  cursor: pointer;
`;
