import React, { useContext, useEffect, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import { deepOrange } from '@material-ui/core/colors';

import { register } from '../../store/auth/auth-actions';
import { useSelector, useDispatch } from 'react-redux';

const Register = (props) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
    <Container maxWidth="xs">
      <div>
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
      </div>
      <form onSubmit={onSubmit}>
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
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Register;
