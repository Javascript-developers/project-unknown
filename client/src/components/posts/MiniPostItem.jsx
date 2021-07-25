import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Typography, Paper, Grid, Box } from '@material-ui/core';

import useStyles from '../../styles/layout/miniPostItem.styles';

const MiniPostItem = ({ post }) => {
  const classes = useStyles();

  return (
    <Grid container elevation={0} className={classes.root} component={Paper}>
      <Grid item xs={12}>
        <Link
          to={{
            pathname: `/post/${post._id}`,
            state: { post: post },
          }}
          className={classes.titleLink}
        >
          <Typography variant="h4" className={classes.title}>
            {post.title}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.tagsContainer}>
          {post.tags !== null
            ? post.tags.map((tag, i) => (
                <Link key={i} to={`/t/${tag}`} className={classes.tagLink}>
                  <span className={classes.tag}>#{tag}</span>
                </Link>
              ))
            : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MiniPostItem;
