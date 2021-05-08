import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { registerUser, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(user);
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container maxWidth="xs">
      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
      </div>
      <form onSubmit={onSubmit}>
        {/* <div>
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
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
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            required
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Register" /> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="Password"
          name="password"
          autoComplete="password"
          autoFocus
          value={password}
          onChange={onChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="Password Confirm"
          name="passwordConfirm"
          autoComplete="passwordConfirm"
          autoFocus
          value={passwordConfirm}
          onChange={onChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Register;
