import React from 'react';

import { useSelector } from 'react-redux';
import MiniUserCard from '../layout/MiniUserCard';

import { Grid } from '@material-ui/core';

import useStyles from '../../styles/dashboard/following-followers.styles';

const FollowingUsersPannel = () => {
  const classes = useStyles();

  const followingUsers = useSelector((state) => state.user.following);
  return (
    <Grid spacing={1} container className={classes.root}>
      {followingUsers.map((user, i) => (
        <Grid item key={i} xs={12} sm={6} md={3}>
          <MiniUserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FollowingUsersPannel;
