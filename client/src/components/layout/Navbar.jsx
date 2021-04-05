import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <Container>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ListContainer>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">About</Link>
        </ListItem>
      </ListContainer>
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
