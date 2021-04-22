import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem>
        <Link to="/about">About</Link>
      </ListItem>
      <ListAvatarItem>{currentUser ? currentUser.name : null}</ListAvatarItem>
      <ListItem>
        <a onClick={onLogout} href="#">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </ListItem>
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
    <Container>
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
      <ListContainer>{isAuthenticated ? authLinks : guestLinks}</ListContainer>
    </Container>
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  border-bottom: solid 1px rgb(142, 208, 249);
  opacity: 0.9;
  margin-bottom: 1rem;
  padding: 0.7rem 2rem;
  background: rgb(29, 161, 242);
  color: white;
  a {
    text-decoration: none;
    color: white;
    &:hover {
      color: grey;
    }
  }
`;

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
  color: red;
`;
