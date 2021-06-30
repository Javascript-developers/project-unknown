import React, { useState } from 'react';

import * as moment from 'moment';
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { red } from '@material-ui/core/colors';

import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

import { useSelector } from 'react-redux';
import useStyles from '../../styles/layout/postItem.styles';

const PostItem = ({ post, bookmarkOnPost }) => {
  let currentPost = post;

  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [raised, setRaised] = useState(0);

  const cardHover = () => setRaised(3);
  const cardLeaveHover = () => setRaised(0);

  const checkBookmark = (bookmarks) => {
    let match = bookmarks.indexOf(currentPost._id) !== -1;
    return match;
  };

  const [bookmarkValue, setbookmarkValue] = useState({
    bookmark: checkBookmark(currentUser.bookmarkedPosts),
  });

  const onBookmarkPost = () => {
    let callApi = bookmarkValue.bookmark ? 'unBookmark' : 'bookmark';

    setbookmarkValue({
      ...bookmarkValue,
      bookmark: !bookmarkValue.bookmark,
    });
    bookmarkOnPost(callApi, currentPost._id);
  };

  const bookmarkButton = (
    <Button
      onClick={onBookmarkPost}
      variant={bookmarkValue.bookmark ? 'contained' : 'outlined'}
    >
      {bookmarkValue.bookmark ? 'Saved' : 'Save'}
    </Button>
  );

  return (
    <Grid
      onMouseOver={cardHover}
      onMouseLeave={cardLeaveHover}
      raised={raised}
      className={classes.root}
      container
      component={Paper}
      elevation={raised}
    >
      <Grid item align="center" className={classes.avatarContainer} xs={1}>
        <Avatar sx={{ bgcolor: red[500] }} arial-label="post">
          {currentPost.user.avatar ? (
            <Image
              cloudName="dsmrt6yiw"
              publicId={currentPost.user.avatar}
              width="100%"
              // crop="scale"
            />
          ) : null}
        </Avatar>
      </Grid>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <Link
              to={`/user/${currentPost.user._id}`}
              className={classes.usernameLink}
            >
              <Typography variant="body2" className={classes.username}>
                {currentPost.user.name}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.date}>
              {moment(
                currentPost.createdAt.toString(),
                'YYYYMMDD HH:mm:ss'
              ).fromNow()}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.titleContainer}>
            <Link
              to={{
                pathname: `/post/${currentPost._id}`,
                state: { post: currentPost },
              }}
              className={classes.titleLink}
            >
              <Typography variant="h4" className={classes.title}>
                {currentPost.title}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.tag}>
              {currentPost.tags !== null
                ? currentPost.tags.map((tag, i) => (
                    <Link key={i} to={`/t/${tag}`} className={classes.tagLink}>
                      <span className={classes.tagHash}>#</span>
                      {tag}
                    </Link>
                  ))
                : null}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.socialContainer}>
            <Grid container>
              <Grid item xs={3} className={classes.socialItem}>
                <FavoriteBorderIcon />
                {currentPost.likes.length} likes
              </Grid>
              <Grid item xs={3} className={classes.socialItem}>
                <ChatBubbleOutlineIcon />
                <Typography variant="srOnly">
                  {currentPost.comments.length} comments
                </Typography>
              </Grid>

              <Grid
                align="right"
                item
                xs={6}
                className={classes.socialItemBookmark}
              >
                {bookmarkButton}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostItem;
