import React from 'react';

import TagCard from '../layout/TagCard';
import { Paper, Grid, Typography } from '@material-ui/core';

import useStyles from '../../styles/dashboard/following-followers.styles';
import { useSelector } from 'react-redux';

const FollowingTagsPannel = () => {
  const classes = useStyles();
  const tags = useSelector((state) => state.user.currentUser.followTags);

  return (
    <Grid spacing={1} container className={classes.root}>
      {tags.map((tag, i) => (
        <Grid item key={i} xs={12} sm={6} md={3}>
          <TagCard tag={tag} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FollowingTagsPannel;
