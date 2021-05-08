import React, { useEffect, useContext, useState } from 'react';
import PostContext from '../../context/post/postContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../layout/Spinner';

import axios from 'axios';

import Comment from '../layout/Comment';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const bannerBoxStyle = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
  color: '#fff',
  overflow: 'hidden',
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
};

const Post = (props) => {
  let { id } = useParams();

  const postContext = useContext(PostContext);
  const {
    getCurrentPost,
    currentPost,
    getUser,
    user,
    cleanUp,
    deletePost,
    createCommentOnPost,
    getCommentsFromPost,
    commentsFromPost,
  } = postContext;

  const [commentState, setCommentState] = useState({
    comment: '',
  });

  const { comment } = commentState;

  useEffect(() => {
    getCurrentPost(id);
    getCommentsFromPost(id);
  }, []);

  // useEffect(() => {
  //   getCommentsFromPost(id);
  // }, [commentsFromPost]);

  useEffect(() => {
    if (currentPost) {
      getUser(currentPost.user.id);
    }
    return () => {
      if (currentPost) {
        cleanUp();
      }
    };
  }, [currentPost]);

  //FIXME: history.push will take you to home page even if the post cannot be deleted
  const onDeletePost = () => {
    deletePost(id);
    props.history.push('/');
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    if (commentState.comment > '') {
      createCommentOnPost(id, commentState);
      getCommentsFromPost(id);
      //FIXME: setTimeout it's an work arround.. find a better solution
      setTimeout(() => {
        getCommentsFromPost(id);
      }, 700);
    } else {
      console.error('comment section must not be empty');
    }
  };

  const onChange = (e) => {
    setCommentState({
      ...commentState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWith="lg">
      <Box sx={{ flexGrow: 1 }}>
        {currentPost ? (
          <Grid container spacing={3}>
            <Grid
              sx={{ marginTop: '30px' }}
              dalign="center"
              item
              xs={12}
              md={8}
            >
              <Paper elevation={3}>
                <Box sx={bannerBoxStyle}>
                  <Box>
                    <Typography variant="h5">{currentPost.title}</Typography>
                  </Box>
                  <Box sx={{ fontStyle: 'italic', color: '#d6d6d6' }}>
                    <Typography variant="caption">
                      "{currentPost.description}"
                    </Typography>
                  </Box>
                </Box>
                <Grid sx={{ marginTop: '20px' }} container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Typography
                      sx={{ marginLeft: '20px' }}
                      variant="inherit"
                      style={{ color: 'grey' }}
                    >
                      {currentPost.createdAt}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    item
                    xs={12}
                    md={4}
                  >
                    test grid
                  </Grid>
                </Grid>
                <Divider />
                <Box>asdsad</Box>
              </Paper>
              <Typography sx={{ marginTop: '20px' }} variant="h5">
                Comments
              </Typography>
              <Divider />
              <div>
                <form onSubmit={onSubmitComment}>
                  <textarea
                    name="comment"
                    cols="50"
                    rows="3"
                    value={comment}
                    onChange={onChange}
                  ></textarea>
                  <input type="submit" value="Add Comment" />
                </form>
              </div>
              <Paper
                sx={{
                  padding: '20px 20px',
                  marginTop: '30px',
                }}
              >
                {commentsFromPost !== null ? (
                  commentsFromPost.map((com, i) => (
                    <Comment key={i} comment={com} />
                  ))
                ) : (
                  <Spinner />
                )}
              </Paper>
            </Grid>
            <Grid align="center" item xs={12} md={4} sx={{ marginTop: '30px' }}>
              <Paper elevation={3}>
                <Container sx={{ paddingTop: '40px' }} maxWidth="sx">
                  <div>
                    <Avatar alt="user avatar" sx={{ bgcolor: deepOrange[500] }}>
                      User
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      {currentPost.user.name}
                    </Typography>
                  </div>
                </Container>
                <Container align="left" sx={{ marginTop: '30px' }}>
                  asd
                </Container>
              </Paper>
              <Paper elevation={3}>
                <Container sx={{ marginTop: '30px', padding: '20px 0' }}>
                  <Typography align="left" variant="h6">
                    Tags
                  </Typography>
                  <Divider />
                  <Stack
                    sx={{ margin: '15px 0 10px 0' }}
                    direction="row"
                    spacing={1}
                  >
                    <Chip clickable label="Technology" variant="outlined" />
                    <Chip clickable label="Learning" variant="outlined" />
                  </Stack>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Spinner />
        )}
      </Box>
    </Container>
  );
};

export default Post;
