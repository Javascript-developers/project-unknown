import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import useStyles from '../../styles/create-post.styles';
import {
  Container,
  Box,
  Grid,
  Button,
  InputBase,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ChipInput from 'material-ui-chip-input';

import Image from 'material-ui-image';

import { createPost } from '../../store/post/post-actions';
import { useDispatch, useSelector } from 'react-redux';

const CreatePost = () => {
  const classes = useStyles();
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
    dispatch(
      createPost({
        ...createPostState,
        postBody: postBody.replace('\\n', '\n'),
      })
    );
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
      tags: [...createPostState.tags, chip.toLowerCase()],
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
      <div className={classes.root}>
        <Container className={classes.container} maxWidth="md">
          {/* <form onSubmit={onSubmitCreatePost}> */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Image
                style={{
                  marginTop: '15px',
                  paddingTop: '0px',
                  margin: '0px auto',
                }}
                imageStyle={{
                  height: '150px',
                  width: '300px',
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
                disableSpinner={true}
              />
              <Button variant="outlined" component="label">
                Add cover image
                <input
                  accept=".png, .jpg, .jpeg"
                  type="file"
                  name="banner"
                  onChange={handleFileInputChange}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component={InputBase}
                placeholder="Title..."
                value={title}
                onChange={onChange}
                required
                label="Title"
                name="title"
                fullWidth
                autoFocus
                multiline
                sx={{ fontWeight: 'bold' }}
              >
                Lol
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* //TODO: Limit to 4 tags
                  //FIXME: aaa and AAA will result in dubplicates */}
              <ChipInput
                placeholder="Add up to 4 tags..."
                value={createPostState.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
                disableUnderline
                newChipKeyCodes={[32]}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBase
                placeholder="Add a description of the post..."
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                name="description"
                // autoComplete="description"
                autoFocus
                value={description}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBase
                fullWidth={true}
                placeholder="Add your post content here..."
                name="postBody"
                id="outlined-textarea"
                label="Multiline Placeholder"
                multiline
                value={postBody}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.publishButton}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<SendIcon />}
            onClick={onSubmitCreatePost}
          >
            Publish
          </Button>
          {/* </form> */}
        </Container>
      </div>
    );
  }
};

export default CreatePost;
