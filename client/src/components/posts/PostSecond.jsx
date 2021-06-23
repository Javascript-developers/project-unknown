import React, {useRef, useEffect, useState} from 'react';

import { useParams } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

import * as moment from 'moment';

import {
  Container,
  Grid,
  Divider,
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Stack,
  Button,
  Modal,
  CssBaseline,
  Zoom,
} from '@material-ui/core';

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

import PostSocialBar from '../layout/PostSocialBar';
import PostUserProfile from '../layout/PostUserProfile';
import Comment from '../layout/Comment';

import useStyles from '../../styles/post.styles';


const bannerBoxStyle = {
  // backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5), url(https://source.unsplash.com/random)`,
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
}

const PostSecond = (props) => {
  let { id } = useParams();
  const classes = useStyles();
  const commentTextArea = useRef(null)

  const dispatch = useDispatch();
  // const currentPostFetched = useSelector((state) => state.post.currentPost);
  const currentPost = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.post.commentsFromPost);
  const currentPostLikes = useSelector((state) => state.post.currentPostLikes);
  const currentPostLiked = useSelector((state) => state.post.currentPostLiked);

  //TODO: when you want to add a comment straight from outside of component
  // useEffect(() => {
  //   if(commentTextArea.current) {
  //     commentTextArea.current.focus()
  //   }
  // }, [])

  const currentUser = useSelector((state) => state.auth.currentUser);

  const [commentState, setCommentState] = useState({
    comment: '',
  });

  // const [values, setValues] = useState({
  //   following: null,
  // });

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
  //   if (currentPost !== null && currentUser !== null) {
  //     console.log('LOL');
  //     let following = checkFollow(currentPost.user.followers, currentUser._id);
  //     setValues({
  //       ...values,
  //       following,
  //     });
  //   }

    if (currentPost !== null && currentPost.banner) {
      setBannerStyle(bannerBoxStyle);
    } else {
      setBannerStyle(null);
    }
  }, [currentPost]);

  // const checkFollow = (user, me) => {
  //   const match = user.some((follower) => follower._id === me);
  //   return match;
  // };

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

  // const clickFollowButton = (followApi) => {
  //   dispatch(followApi(currentPost.user.id)).then((data) => {
  //     setValues({
  //       ...values,
  //       following: !values.following,
  //     });
  //   });
  // };

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
    <Container maxWidth="lg" >
      {currentPost && currentUser ? (
      <Grid container component="main" className={classes.root}>
      <Grid item align="center" xs={12} sm={1}>
        <PostSocialBar 
          currentPostLiked={currentPostLiked}
          likesNo={currentPostLikes}
          currentUser={currentUser}
          currentPost={currentPost}
          likeOnPost={likeOnPost}
        />
      </Grid>
      <Grid
        item
        component={Paper}
        // elevation={3}
        xs={12}
        md={7}
        className={classes.postGrid}
      >
        <Grid item xs={12}>
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
        </Grid>
        <Grid item className={classes.afterBannerContainer}> 
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.title}>
          {currentPost.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Chip
            clickable
            className={classes.color1}
            label={`#tag1`}
            variant="filled"
            size="small"
          />
          <Chip
            className={classes.color2}
            clickable
            label={`#tag2`}
            variant="outlined"
            size="small"
          />
          <Chip
            className={classes.color3}
            clickable
            label={`#tag3`}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} className={classes.userPost}>
          <Avatar className={classes.avatarPost} alt="user avatar">
            {currentPost.user.avatar ? (
              //TODO: cloudname should be in .env
              <Image 
                cloudName="dsmrt6yiw"
                publicId={currentPost.user.avatar}
                width="100%"
              />
            ): null}
          </Avatar>
          <Typography className={classes.userPostName} variant="subtitle2">{currentPost.user.name}</Typography>
          <Typography className={classes.userPostDate} variant="caption">● {moment(
                        currentPost.createdAt.toString(),
                        'YYYYMMDD HH:mm:ss'
                      ).fromNow()}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.postBodyContainer}>
            {currentPost.postBody.split('\n').map((item, i) => {
              return (
                <span key={i}>
                  <Typography className={classes.postBodyTypo} variant="subtitle1">{item}</Typography>
                  <br />
                </span>
              );
            })}
        </Grid>
        <Divider />
        <Grid item xs={12} className={classes.commentSection}>
          <Typography variant="h4">Comments</Typography> 
          <div className={classes.addCommentContainer}>
            <Grid container>
              <Grid item xs={1}>
                <Avatar className={classes.avatarAddComment}>
                {currentUser.avatar ? (
              //TODO: cloudname should be in .env
              <Image 
                cloudName="dsmrt6yiw"
                publicId={currentUser.avatar}
                width="100%"
              />
            ): null}
                </Avatar>
              </Grid>
              <Grid item xs={11}>
                <textarea className={classes.commentTextArea} name="comment" rows="3" ref={commentTextArea} placeholder="Start writing a comment..."
                ></textarea>
                <Button variant="contained">Submit</Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      </Grid>
      <Grid item align="center" xs={12} md={3} elevation={3} className={classes.postInfoContainer}>
        <PostUserProfile currentPostUser={currentPost.user} currentUser={currentUser} />
        
      </Grid>
    </Grid>
    ) : <Spinner />}

    </Container>
  );
};

export default PostSecond;
