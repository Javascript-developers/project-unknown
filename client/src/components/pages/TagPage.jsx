import React, { useEffect, useState } from 'react';

import PostItem from '../posts/PostItem';
import FollowButton from '../layout/FollowButton';
import Spinner from '../layout/Spinner';
import { useParams } from 'react-router';
import tagsColor from '../../utils/tagsBackgroundColor';

import { useSelector, useDispatch } from 'react-redux';

import { Container, Typography, Grid, Paper } from '@material-ui/core';

import { fetchPostsByTag } from '../../store/post/post-actions';

import useStyles from '../../styles/layout/tag-page.styles';

const TagPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tagPosts = useSelector((state) => state.post.postsByTag);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [values, setValues] = useState({
    following: null,
  });

  const { id } = useParams();

  let bgBanner = tagsColor.find((tag) => tag.tagName === id);

  useEffect(() => {
    dispatch(fetchPostsByTag(id));
    let following = checkFollow(currentUser.followTags, id);
    setValues({
      ...values,
      following,
    });
  }, [dispatch]);

  const checkFollow = (user, currentTag) => {
    const match = user.some((tag) => tag === currentTag);
    return match;
  };

  const clickFollowButton = (followApi) => {
    dispatch(followApi(id)).then((data) => {
      setValues({
        ...values,
        following: !values.following,
      });
    });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: bgBanner !== undefined ? bgBanner.bg : 'gray',
        }}
        className={classes.tagBanner}
      ></div>
      <Container maxWidth="lg">
        <Grid container component="main">
          <Grid component={Paper} item xs={12} className={classes.tagHeader}>
            <Grid container>
              <Grid item xs={8} md={10} className={classes.headerItems}>
                <Typography className={classes.tagName} variant="h2">
                  #{id}
                </Typography>
              </Grid>
              <Grid item xs={4} md={2} className={classes.headerItems}>
                <FollowButton
                  profile={false}
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.tagPosts}>
            {tagPosts !== null ? (
              tagPosts.map((post, i) => <PostItem key={i} post={post} />)
            ) : (
              <Spinner />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TagPage;
