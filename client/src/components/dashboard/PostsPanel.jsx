import React, { useEffect } from 'react';
import MiniPostItem from '../posts/MiniPostItem';

import { Grid } from '@material-ui/core';

import useStyles from '../../styles/dashboard/posts-panel.styles';
import { getMyPosts } from '../../store/post/post-actions';
import { useDispatch, useSelector } from 'react-redux';

const PostsPannel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.post.myPosts);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <Grid spacing={1} container className={classes.root}>
      {myPosts !== null
        ? myPosts.map((post, i) => (
            <Grid
              item
              key={i}
              xs={12}
              md={6}
              className={classes.miniPostGridItem}
            >
              <MiniPostItem post={post} />
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default PostsPannel;
