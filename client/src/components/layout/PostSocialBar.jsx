import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import IconButton from '@material-ui/core/IconButton';

const PostSocialBar = ({
  currentUser,
  currentPost,
  likeOnPost,
  likesNo,
  currentPostLiked,
}) => {
  const onLikePost = () => {
    let callApi = currentPostLiked ? 'unlikePost' : 'likePost';

    likeOnPost(callApi);
  };

  const likeUnlike = currentPostLiked ? (
    <FavoriteIcon />
  ) : (
    <FavoriteBorderIcon />
  );
  // const bookmarkIcon = values.bookmark ? (
  //   <BookmarkOutlinedIcon />
  // ) : (
  //   <BookmarkBorderOutlinedIcon />
  // );

  return (
    <Container>
      {/* <Paper elevation={3}> */}
      <Grid container align="center" sx={{ marginTop: '30px' }}>
        <Grid xs={12} item align="center">
          <IconButton onClick={onLikePost}>
            {likeUnlike}
            {likesNo}
          </IconButton>
        </Grid>
        <Grid xs={12} item align="center" sx={{ marginTop: '30px' }}>
          {/* <IconButton>{bookmarkIcon}</IconButton> */}
        </Grid>
      </Grid>
      {/* </Paper> */}
    </Container>
  );
};

export default PostSocialBar;
