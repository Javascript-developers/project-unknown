import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { deepOrange } from '@material-ui/core/colors';

import {
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Avatar,
  Paper,
} from '@material-ui/core';

import useStyles from '../../styles/auth.styles';

// import { register } from '../../store/auth/auth-actions';
import { register } from '../../store/user/user-actions';

import { useSelector, useDispatch } from 'react-redux';

const Register = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    about: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, about, password, passwordConfirm } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 100,
              height: 100,
              margin: '0 auto',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
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
              fullWidth
              label="About"
              name="about"
              autoComplete="about"
              autoFocus
              value={about}
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
              Register
            </Button>
            <Grid item sx={12} className={classes.linkContainer}>
              <Link to="/login" className={classes.link}>
                <Typography variant="body1">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
