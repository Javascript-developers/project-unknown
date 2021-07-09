import React from 'react';

import MiniUserCard from '../layout/MiniUserCard';

import { useSelector } from 'react-redux';
import useStyles from '../../styles/dashboard/following-followers.styles';

import { Grid } from '@material-ui/core';

const FollowingPannel = () => {
  const classes = useStyles();

  const followers = useSelector((state) => state.user.followers);
  return (
    <Grid spacing={1} container className={classes.root}>
      {followers.map((user, i) => (
        <Grid item key={i} xs={12} sm={6} md={3}>
          <MiniUserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FollowingPannel;
