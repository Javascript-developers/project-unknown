import React, { useContext, useEffect, useState } from 'react';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import {
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Avatar,
  Paper,
} from '@material-ui/core';

import useStyles from '../../styles/auth.styles';
import { useSelector, useDispatch } from 'react-redux';
// import { login } from '../../store/auth/auth-actions';
import { login } from '../../store/user/user-actions';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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

    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={onSubmit} className={classes}>
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid item sx={12} className={classes.linkContainer}>
              <Link to="/register" className={classes.link}>
                <Typography variant="body1">
                  You don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
