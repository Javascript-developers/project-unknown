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

const PostSocialBar = ({ currentUser, currentPost, likeOnPost }) => {
  const checkLike = (likes) => {
    let match = likes.indexOf(currentUser._id) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    like: checkLike(currentPost.likes),
    likes: currentPost.likes.length,
  });

  const onLikePost = () => {
    let callApi = values.like ? 'unlikePost' : 'likePost';
    // callApi(currentPost.id).then((data) => {
    //   setValues({
    //     ...values,
    //     like: !values.like,
    //     likes: data.data.post.likes.length,
    //   });
    // });
    console.log(currentPost);
    likeOnPost(callApi);
    setValues({
      ...values,
      like: !values.like,
    });
  };

  const likeUnlike = values.like ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  const bookmarkIcon = values.bookmark ? (
    <BookmarkOutlinedIcon />
  ) : (
    <BookmarkBorderOutlinedIcon />
  );

  return (
    <Container>
      {/* <Paper elevation={3}> */}
      <Grid container align="center" sx={{ marginTop: '30px' }}>
        <Grid xs={12} item align="center">
          <IconButton onClick={onLikePost}>
            {likeUnlike}
            {values.likes}
          </IconButton>
        </Grid>
        <Grid xs={12} item align="center" sx={{ marginTop: '30px' }}>
          <IconButton>{bookmarkIcon}</IconButton>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </Container>
  );
};

export default PostSocialBar;
