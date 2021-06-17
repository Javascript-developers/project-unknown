import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import Image from 'material-ui-image';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { createPost } from '../../store/post/post-actions';
import { useDispatch, useSelector } from 'react-redux';

const CreatePost = () => {
  const dispatch = useDispatch();
  const newPost = useSelector((state) => state.post.newPost);

  const [createPostState, setCreatePostState] = useState({
    title: '',
    postBody: '',
    description: '',
    tags: [],
    banner: '',
  });

  const { title, postBody, description } = createPostState;

  const [redirectTo, setRedirectTo] = useState(false);

  useEffect(() => {
    if (newPost !== null) {
      setRedirectTo(true);
    }
  }, [newPost]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    console.log(createPostState.banner);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCreatePostState({
        ...createPostState,
        banner: reader.result,
      });
    };
  };
  const onSubmitCreatePost = (e) => {
    e.preventDefault();
    dispatch(createPost(createPostState));
    // setTimeout(() => {
    //   setCreatePostState({
    //     title: '',
    //     postBody: '',
    //     description: '',
    //     tags: [],
    //   });
    // }, 1000);
  };
  const onChange = (e) => {
    setCreatePostState({
      ...createPostState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChip = (chip) => {
    setCreatePostState({
      ...createPostState,
      tags: [...createPostState.tags, chip],
    });
  };
  const handleDeleteChip = (chip, index) => {
    setCreatePostState({
      ...createPostState,
      tags: createPostState.tags.filter((chip, i) => i !== index),
    });
  };
  if (redirectTo) {
    return <Redirect to={`/post/${newPost._id}`} />;
  } else {
    return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container item xs={12}>
            <Image
              style={{
                marginTop: '15px',
                paddingTop: '0px',
                margin: '0px auto',
              }}
              imageStyle={{
                height: '250px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                flexDirection: 'column',
              }}
              src={createPostState.banner && createPostState.banner}
            />
            <form onSubmit={onSubmitCreatePost}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={title}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                onChange={onChange}
              />
              <TextField
                name="postBody"
                id="outlined-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
                value={postBody}
                onChange={onChange}
              />
              <ChipInput
                value={createPostState.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
              />
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                name="banner"
                onChange={handleFileInputChange}
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Create New Post
              </Button>
            </form>
          </Grid>
        </Box>
      </Container>
    );
  }
};

export default CreatePost;
