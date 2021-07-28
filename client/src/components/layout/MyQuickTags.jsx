import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

import useStyles from '../../styles/layout/my-quick-tags.styles';
import { useSelector } from 'react-redux';

const MyQuickTags = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Box className={classes.root}>
      <Typography variant="h6">My Tags</Typography>
      <Box className={classes.tagsContainer}>
        {currentUser.followTags.map((tag, i) => (
          <Link key={i} to={`/t/${tag}`} className={classes.tag}>
            <Typography variant="body1">#</Typography>
            <Typography variant="body1">{tag}</Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default MyQuickTags;
