import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

import * as moment from 'moment';

import {
  deleteCommentOnPost,
  createCommentOnPost,
  fetchCurrentPost,
  fetchTrendingPosts,
  likePost,
  unlikePost,
  deletePost,
} from '../../store/post/post-actions';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../store/post/post-slice';

import Spinner from '../layout/Spinner';
import { Image } from 'cloudinary-react';
import ImageMaterial from 'material-ui-image';

import FollowButton from './../layout/FollowButton';
import PostSocialBar from '../layout/PostSocialBar';

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
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const modalStyle = {
  position: 'absolute',
  top: '35%',
  left: '35%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

const bannerBoxStyle = {
  // backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))
  // `,
  // `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')`,
  // color: '#fff',
  overflow: 'hidden',
  height: '300px',
  // backgroundPosition: 'center',
  // backgroundRepeat: 'no-repeat',
  // backgroundSize: 'cover',
  // position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  flexDirection: 'column',
  zIndex: '1',
};

const Post = (props) => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const currentPostFetched = useSelector((state) => state.post.currentPost);
  const currentPost = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.post.commentsFromPost);
  const currentPostLikes = useSelector((state) => state.post.currentPostLikes);
  const currentPostLiked = useSelector((state) => state.post.currentPostLiked);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const [commentState, setCommentState] = useState({
    comment: '',
  });

  const [values, setValues] = useState({
    following: null,
  });

  const [redirectTo, setRedirectTo] = useState(false);
  const [bannerStyle, setBannerStyle] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { comment } = commentState;

  useEffect(() => {
    if (currentPost !== null && currentPost.banner) {
      setBannerStyle(bannerBoxStyle);
    }
    dispatch(postActions.addPost(id));
    dispatch(postActions.checkLike(currentUser));
    dispatch(postActions.cleanUpNewPost());
  }, []);

  useEffect(() => {
    if (currentPost !== null && currentUser !== null) {
      console.log('LOL');
      let following = checkFollow(currentPost.user.followers, currentUser._id);
      setValues({
        ...values,
        following,
      });
    }

    if (currentPost !== null && currentPost.banner) {
      setBannerStyle(bannerBoxStyle);
    } else {
      setBannerStyle(null);
    }
  }, [currentPost]);

  const checkFollow = (user, me) => {
    const match = user.some((follower) => follower._id === me);
    return match;
  };

  const onDeletePost = () => {
    dispatch(deletePost(id));
    setRedirectTo(true);
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    if (commentState.comment > '') {
      dispatch(createCommentOnPost(id, commentState, currentUser));
      setCommentState({
        comment: '',
      });
    } else {
      console.error('comment section must not be empty');
    }
  };

  //TODO: Check if passing data trough f. params, from child component is valid
  //FIXME: When deleting comment straight after posting it does not work
  //because the ID of the comment is undefiend
  const removeComment = (postId, comId) => {
    dispatch(deleteCommentOnPost(postId, comId));
  };

  const onChange = (e) => {
    setCommentState({
      ...commentState,
      [e.target.name]: e.target.value,
    });
  };

  const clickFollowButton = (followApi) => {
    dispatch(followApi(currentPost.user.id)).then((data) => {
      setValues({
        ...values,
        following: !values.following,
      });
    });
  };

  const likeOnPost = (callApi) => {
    const f = callApi === 'likePost' ? likePost : unlikePost;
    dispatch(f(id));
  };

  const deleteButton =
    currentPost !== null &&
    currentUser !== null &&
    currentPost.user.id === currentUser.id ? (
      <Button onClick={handleOpenModal} variant="contained" color="secondary">
        Delete Post
      </Button>
    ) : (
      <span style={{ cursor: 'not-allowed' }}>
        <Button variant="contained" disabled>
          Delete Post
        </Button>
      </span>
    );

  if (redirectTo) {
    return <Redirect to="/" />;
  }
  return (
    <Container maxWidth="lg">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-create-post"
        aria-describedby="modal-modal-description"
      >
        <Zoom in={openModal}>
          <Box sx={modalStyle}>
            <p>Are you sure you want to delete this post?</p>
            <Button onClick={onDeletePost}>Yes</Button>
            <Button onClick={handleCloseModal}>No</Button>
          </Box>
        </Zoom>
      </Modal>

      <Box sx={{ flexGrow: 1 }}>
        {currentPost && currentUser ? (
          <Grid container spacing={3}>
            <Grid align="center" sx={{ marginTop: '30px' }} item xs={12} md={1}>
              <PostSocialBar
                // likePost={likePost}
                // unlikePost={unlikePost}
                currentPostLiked={currentPostLiked}
                likesNo={currentPostLikes}
                currentUser={currentUser}
                currentPost={currentPost}
                likeOnPost={likeOnPost}
              />
            </Grid>
            <Grid sx={{ marginTop: '30px' }} item xs={12} md={7}>
              <Paper elevation={3}>
                <Container sx={bannerStyle}>
                  {/* <Box> */}
                  {/* <ImageMaterial
                    imageStyle={bannerBoxStyle}
                    src={bannerImage}
                  /> */}
                  <Image
                    cloudName="dsmrt6yiw"
                    publicId={currentPost.banner}
                    with="100%"
                  />
                </Container>
                <Box
                  sx={{
                    position: 'relative',
                  }}
                >
                  <Container>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: 'bold', marginTop: '15px' }}
                    >
                      {currentPost.title}
                    </Typography>
                    <Box
                      sx={{
                        fontStyle: 'italic',
                        color: 'grey',
                      }}
                    >
                      <Typography variant="caption">
                        "{currentPost.description}"
                      </Typography>
                    </Box>
                  </Container>
                </Box>
                <Grid sx={{ marginTop: '20px' }} container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ marginLeft: '20px' }}
                      variant="inherit"
                      style={{ color: 'grey' }}
                    ></Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Container>
                  <div></div>
                </Container>
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
                {comments !== null ? (
                  comments.map((com, i) => (
                    <Comment key={i} onRemove={removeComment} comment={com} />
                  ))
                ) : (
                  <Spinner />
                )}
              </Paper>
            </Grid>
            <Grid align="center" item xs={12} md={4} sx={{ marginTop: '30px' }}>
              <Paper elevation={3} sx={{ paddingBottom: '40px' }}>
                <Container sx={{ paddingTop: '40px' }}>
                  <div>
                    <Avatar
                      alt="user avatar"
                      sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}
                    >
                      {currentPost.user.avatar ? (
                        <Image
                          cloudName="dsmrt6yiw"
                          publicId={currentPost.user.avatar}
                          width="100%"
                          // crop="scale"
                        />
                      ) : null}
                    </Avatar>

                    <Typography component="h1" variant="h5">
                      {currentPost.user.name}
                    </Typography>
                    <Typography variant="caption">
                      {currentPost ? currentPost.user.about : null}
                    </Typography>
                  </div>
                </Container>
                <Container align="left" sx={{ marginTop: '30px' }}>
                  asd
                </Container>
                <Grid
                  align="center"
                  container
                  spacing={3}
                  sx={{ marginTop: '15px' }}
                >
                  <Grid item xs={12} md={6}>
                    <Button variant="contained">Edit Post</Button>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ marginBottom: '20px' }}>
                    {deleteButton}
                  </Grid>
                </Grid>
                <FollowButton
                  profile={true}
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
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
                    {currentPost.tags.map((tag, i) => (
                      <Link
                        key={i}
                        sstyle={{ textDecoration: 'none' }}
                        to={`/t/${tag}`}
                      >
                        <Chip clickable label={`#${tag}`} variant="outlined" />
                      </Link>
                    ))}
                    {/* <Chip clickable label="Technology" variant="outlined" />
                    <Chip clickable label="Learning" variant="outlined" /> */}
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
