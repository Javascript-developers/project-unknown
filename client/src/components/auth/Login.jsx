import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
      console.log(isAuthenticated, 'Is Authenticated');
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please enter all fields');
    }

    console.log('LOGIN COMPONENT', email, password);

    login({
      //   email: email[0],
      //   password: password[0],
      email,
      password,
    });
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </Container>
  );
};

export default Login;

const Container = styled.div``;
