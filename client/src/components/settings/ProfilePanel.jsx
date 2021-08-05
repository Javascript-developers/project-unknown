import React, { useState, useEffect } from 'react';

import {
  Avatar,
  TextField,
  Typography,
  Container,
  Button,
  Grid,
  Box,
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { editUserProfile } from '../../store/user/user-actions';
import { loadUser } from '../../store/user/user-actions';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FileUpload from '@material-ui/icons/AddPhotoAlternate';

import useStyles from '../../styles/settings/profile-panel.styles';

const ProfilePanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const me = useSelector((state) => state.user.currentUser);

  //fileInputState = null originally
  const [fileInputState, setFileInputState] = useState('');

  const [user, setUser] = useState({
    name: '',
    about: '',
    avatar: '',
    website: '',
    twitter: '',
    instagram: '',
    github: '',
    location: '',
    showEmail: false,
  });

  useEffect(() => {
    if (me) {
      setUser({
        ...user,
        name: me.name && me.name,
        username: me.username && me.username,
        about: me.about && me.about,
        website: me.website && me.website,
        twitter: me.twitter && me.twitter,
        instagram: me.instagram && me.instagram,
        github: me.github && me.github,
        location: me.location && me.location,
        showEmail: me.showEmail && me.showEmail,
      });
    }
  }, [me]);

  const {
    name,
    username,
    about,
    website,
    twitter,
    instagram,
    github,
    location,
    showEmail,
  } = user;

  //TODO: ONE STEP BEHIND, you have to upload twice
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // setPreviewSource(reader.result);
      setUser({
        ...user,
        avatar: reader.result,
      });
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editUserProfile(user));
    dispatch(loadUser());
    console.log(user);
  };

  //TODO: REDO THIS PART
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeShowEmail = () => {
    setUser({
      ...user,
      showEmail: !showEmail,
    });
    console.log(showEmail);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={0}
        className={classes.profileCategoryContainer}
      >
        <Typography variant="h5" className={classes.panelTitle}>
          User
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={name}
          name="name"
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="@username"
          value={username}
          name="username"
          onChange={onChange}
          margin="normal"
        />
        <div>
          <div className={classes.uploadAvatar}>
            <Avatar className={classes.avatar} src={user.avatar ?? user.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <input
              // accept="image/*"
              accept=".png, .jpg, .jpeg"
              type="file"
              name="avatar"
              value={fileInputState}
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
              id="icon-button-file"
            />
            <label htmlFor="icon-button-file">
              <Button variant="contained" component="span">
                Upload Avatar Image <FileUpload />
              </Button>
            </label>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={0}
        className={classes.profileCategoryContainer}
      >
        <Typography variant="h5" className={classes.panelTitle}>
          Basic
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="A short bio..."
          name="about"
          value={about}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Location"
          name="location"
          value={location}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={0}
        className={classes.profileCategoryContainer}
      >
        <Typography variant="h5" className={classes.panelTitle}>
          Socials
        </Typography>
        <FormGroup className={classes.showEmail}>
          <FormControlLabel
            control={
              <Checkbox
                inputProps={{ 'aria-label': 'show email' }}
                checked={showEmail}
                onChange={onChangeShowEmail}
              />
            }
            label={
              <Typography className={classes.showEmailText} variant="body1">
                Show email on your account
              </Typography>
            }
          />
        </FormGroup>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="https://yourwebsite.com"
          name="website"
          value={website}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Twitter username"
          name="twitter"
          value={twitter}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Instagram username"
          name="instagram"
          value={instagram}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Github username"
          name="github"
          value={github}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={0}
        className={classes.profileCategoryContainer}
      >
        <Button variant="contained" fullWidth onClick={onSubmit}>
          Save changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfilePanel;
