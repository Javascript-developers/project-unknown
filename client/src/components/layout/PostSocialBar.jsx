import React, { useState } from 'react';

import { Container, Grid, MenuItem, Menu } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const PostSocialBar = ({
  currentUser,
  currentPost,
  likeOnPost,
  likesNo,
  currentPostLiked,
  deletePostOpenModal,
  currentPostBookmarked,
  bookmarkOnPost,
}) => {
  const [anchorMenu, setAnchorMenu] = useState(null);

  const onLikePost = () => {
    let callApi = currentPostLiked ? 'unlikePost' : 'likePost';

    likeOnPost(callApi);
  };

  const onBookmarkPost = () => {
    let callApi = currentPostBookmarked ? 'unbookmark' : 'bookmark';

    bookmarkOnPost(callApi);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const likeUnlike = currentPostLiked ? (
    <FavoriteIcon />
  ) : (
    <FavoriteBorderIcon />
  );

  //TODO: Add bookmark feature
  const bookmarkIcon = currentPostBookmarked ? (
    <BookmarkOutlinedIcon />
  ) : (
    <BookmarkBorderOutlinedIcon />
  );

  return (
    <Container>
      {/* <Paper elevation={3}> */}
      <Grid container align="center" sx={{ marginTop: '30px' }}>
        <Grid xs={4} md={12} item align="center">
          <IconButton onClick={onLikePost}>
            {likeUnlike}
            {likesNo}
          </IconButton>
        </Grid>
        {/* <Grid item xs={4} md={12} align="center"></Grid> */}
        <Grid xs={4} md={12} item align="center">
          <div>
            <IconButton onClick={onBookmarkPost}>{bookmarkIcon}</IconButton>
          </div>
        </Grid>
        <Grid item align="center" xs={4} md={12}>
          <div>
            <IconButton onClick={handleOpenMenu}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorMenu)}
              onClose={handleCloseMenu}
            >
              {currentPost !== null &&
              currentPost.user.id === currentUser.id ? (
                <MenuItem onClick={deletePostOpenModal}>Delete Post</MenuItem>
              ) : (
                <MenuItem>No options</MenuItem>
              )}
            </Menu>
          </div>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </Container>
  );
};

export default PostSocialBar;
