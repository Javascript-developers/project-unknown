import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import AppBar from '@material-ui/core/AppBar/index';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
// import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import Toolbar from '@material-ui/core/Toolbar';

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser, logout } = authContext;

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListAvatarItem>
        <div>
          <div onClick={handleOpenMenu}>
            <AccountCircle />
            {currentUser ? currentUser.name : null}
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
