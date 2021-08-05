import React, { useRef, useEffect, useState } from 'react';

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
import { bookmarkPost, unBookmarkPost } from '../../store/user/user-actions';

import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../store/post/post-slice';
import { userActions } from '../../store/user/user-slice';

import Spinner from '../layout/Spinner';
import { Image } from 'cloudinary-react';

import PostSocialBar from '../layout/PostSocialBar';
import PostUserProfile from '../layout/PostUserProfile';
import Comment from '../layout/Comment';
import TagsOnPost from '../layout/TagsOnPost';
import Footer from '../layout/Footer';

import useStyles from '../../styles/post.styles';

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
  borderRadius: '3px 3px 0 0',
  flexDirection: 'column',
  zIndex: '1',
};

const Post = (props) => {
  let { id } = useParams();
  const classes = useStyles();
  const commentTextArea = useRef(null);

  const dispatch = useDispatch();
  // const currentPostFetched = useSelector((state) => state.post.currentPost);
  const currentPost = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.post.commentsFromPost);
  const currentPostLikes = useSelector((state) => state.post.currentPostLikes);
  const currentPostLiked = useSelector((state) => state.post.currentPostLiked);

  const currentPostBookmarked = useSelector(
    (state) => state.user.currentPostBookmarked
  );

  //TODO: when you want to add a comment straight from outside of component
  // useEffect(() => {
  //   if(commentTextArea.current) {
  //     commentTextArea.current.focus()
  //   }
  // }, [])

  const currentUser = useSelector((state) => state.user.currentUser);

  const [commentState, setCommentState] = useState({
    comment: '',
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
    dispatch(
      userActions.checkBookmark({
        bookmarks: currentUser.bookmarkedPosts,
        postId: id,
      })
    );
  }, []);

  useEffect(() => {
    if (currentPost !== null) {
      dispatch(
        userActions.checkFollowing({
          followers: currentPost.user.followers,
          me: currentUser._id,
        })
      );
    }
  }, [currentPost]);

  useEffect(() => {
    if (currentPost !== null && currentPost.banner) {
      setBannerStyle(bannerBoxStyle);
    } else {
      setBannerStyle(null);
    }
  }, [currentPost]);

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

  const likeOnPost = (callApi) => {
    const f = callApi === 'likePost' ? likePost : unlikePost;
    dispatch(f(id));
  };

  const bookmarkOnPost = (callApi) => {
    const f = callApi === 'bookmark' ? bookmarkPost : unBookmarkPost;
    dispatch(f(id));
  };

  if (redirectTo) {
    return <Redirect to="/" />;
  }

  return (
    <>
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
        {currentPost && currentUser ? (
          <Grid container component="main" className={classes.root}>
            <Grid item align="center" xs={12} md={1}>
              <PostSocialBar
                currentPostLiked={currentPostLiked}
                currentPostBookmarked={currentPostBookmarked}
                likesNo={currentPostLikes}
                currentUser={currentUser}
                currentPost={currentPost}
                likeOnPost={likeOnPost}
                bookmarkOnPost={bookmarkOnPost}
                deletePostOpenModal={handleOpenModal}
              />
            </Grid>
            <Grid
              item
              component={Paper}
              elevation={0}
              xs={12}
              md={7}
              className={classes.postGrid}
            >
              <Grid item xs={12}>
                <Container sx={bannerStyle}>
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
                  <TagsOnPost tags={currentPost.tags} />
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
                    ) : null}
                  </Avatar>
                  <Typography
                    className={classes.userPostName}
                    variant="subtitle2"
                  >
                    <Link
                      to={`/user/${currentPost.user.username}`}
                      className={classes.userPostNameLink}
                    >
                      {currentPost.user.name}
                    </Link>
                  </Typography>
                  <Typography
                    className={classes.userPostDate}
                    variant="caption"
                  >
                    ●{' '}
                    {moment(
                      currentPost.createdAt.toString(),
                      'YYYYMMDD HH:mm:ss'
                    ).fromNow()}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.postBodyContainer}>
                  {currentPost.postBody.split('\n').map((item, i) => {
                    return (
                      <span key={i}>
                        <Typography
                          className={classes.postBodyTypo}
                          variant="subtitle1"
                        >
                          {item}
                        </Typography>
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
                        <Avatar
                          alt="user avatar"
                          className={classes.avatarAddComment}
                        >
                          {currentUser.avatar ? (
                            //TODO: cloudname should be in .env
                            <Image
                              cloudName="dsmrt6yiw"
                              publicId={currentUser.avatar}
                              width="100%"
                            />
                          ) : null}
                        </Avatar>
                      </Grid>
                      <Grid item xs={11}>
                        <textarea
                          className={classes.commentTextArea}
                          name="comment"
                          rows="3"
                          ref={commentTextArea}
                          placeholder="Start writing a comment..."
                          value={comment}
                          onChange={onChange}
                        ></textarea>
                        <Button onClick={onSubmitComment} variant="contained">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.comments}>
                    <Grid container>
                      <Grid item xs={12}>
                        {comments !== null ? (
                          comments.map((com, i) => (
                            <Comment
                              key={i}
                              onRemove={removeComment}
                              comment={com}
                            />
                          ))
                        ) : (
                          <Spinner />
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              align="center"
              xs={12}
              md={3}
              elevation={3}
              className={classes.postInfoContainer}
            >
              <PostUserProfile
                currentPostUser={currentPost.user}
                currentUser={currentUser}
              />
            </Grid>
          </Grid>
        ) : (
          <Spinner />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Post;
