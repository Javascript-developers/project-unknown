import React, { useContext, useState } from 'react';
import UserContext from './../../context/user/userContext';
import AuthContext from './../../context/auth/authContext';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import { deepOrange } from '@material-ui/core/colors';

import { Redirect } from 'react-router-dom';

const EditUserProfile = () => {
  const userContext = useContext(UserContext);
  const { editUserProfile } = userContext;

  // const authContext = useContext(AuthContext);
  // const { currentUser } = authContext;

  const [previewSource, setPreviewSource] = useState('');
  const [fileInputState, setFileInputState] = useState(null);

  const [user, setUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });

  const { name, about } = user;

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

    // if (!previewSource) return;

    // uploadImage(previewSource)

    // const formData = new FormData();
    // formData.append('name', user.name);
    // formData.append('about', user.about);
    // formData.append('avatar', user.avatar);
    // console.log(formData);
    // console.log(user.avatar);
    editUserProfile(user);
    console.log(user);
  };

  const uploadImage = (base64EncodedImage) => {
    // console.log(base64EncodedImage);
    // setUser({
    //   ...user,
    //   avatar: previewSource,
    // });
    // console.log(user);
  };

  //TODO: REDO THIS PART
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
          src={user.avatar ?? user.avatar}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
      </div>
      {/* encType="multipart/form-data" */}
      <form onSubmit={onSubmit}>
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
        <TextField
          variant="outlined"
          margin="normal"
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
          fullWidth
          label="About"
          name="about"
          autoComplete="about"
          autoFocus
          value={about}
          onChange={onChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditUserProfile;
