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

const PostSocialBar = (props) => {
  const checkLike = (likes) => {
    let match = likes.indexOf(props.currentUser._id) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    like: checkLike(props.currentPost.likes),
    likes: props.currentPost.likes.length,
  });

  const onLikePost = () => {
    let callApi = values.like ? props.unlikePost : props.likePost;
    callApi(props.currentPost.id).then((data) => {
      setValues({
        ...values,
        like: !values.like,
        likes: data.data.post.likes.length,
      });
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
        <Grid xs={12} align="center">
          <IconButton onClick={onLikePost}>
            {likeUnlike}
            {values.likes}
          </IconButton>
        </Grid>
        <Grid xs={12} align="center" sx={{ marginTop: '30px' }}>
          <IconButton>{bookmarkIcon}</IconButton>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </Container>
  );
};

export default PostSocialBar;
