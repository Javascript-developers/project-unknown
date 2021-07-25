import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Avatar, Typography, Paper } from '@material-ui/core';

import { Image } from 'cloudinary-react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from '../../styles/layout/post-userProfile.style';
import FollowButton from './FollowButton';

const PostUserProfile = ({ currentPostUser, currentUser }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const postUserFollowing = useSelector(
    (state) => state.user.currentPostUserFollowing
  );

  const clickFollowButton = (followApi) => {
    dispatch(followApi(currentPostUser.id));
  };

  return (
    <div>
      <Grid container elevation={0} component={Paper} className={classes.root}>
        <Grid item align="center" xs={12}>
          <Avatar alt="user avatar" className={classes.avatar}>
            {currentPostUser.avatar ? (
              <Image
                cloudName="dsmrt6yiw"
                publicId={currentPostUser.avatar}
                width="100%"
                // crop="scale"
              />
            ) : null}
          </Avatar>
          <Typography variant="h5" className={classes.username}>
            <Link
              to={`/user/${currentPostUser.id}`}
              className={classes.usernameLink}
            >
              {currentPostUser.name}
            </Link>
          </Typography>
        </Grid>
        <Grid item align="center" className={classes.userDescriptionContainer}>
          <Typography variant="subtitle1" className={classes.userDescription}>
            {currentPostUser.about ? currentPostUser.about : '...'}
          </Typography>
        </Grid>
        <Grid item align="center" xs={12} className={classes.followButton}>
          <FollowButton
            profile={true}
            following={postUserFollowing}
            onButtonClick={clickFollowButton}
            disableButton={currentPostUser.id === currentUser._id}
          />
        </Grid>
        <Grid item xs={12} className={classes.userInfo}></Grid>
      </Grid>
    </div>
  );
};

export default PostUserProfile;
