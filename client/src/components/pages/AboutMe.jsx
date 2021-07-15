import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Box,
  Button,
} from '@material-ui/core';
import { Image } from 'cloudinary-react';

import useStyles from '../../styles/profile/my-profile.styles';

import { getMyPosts } from '../../store/post/post-actions';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../layout/Footer';

import {
  LocationOn,
  Cake,
  Twitter,
  Facebook,
  GitHub,
  Instagram,
  Web,
  Tag,
  PostAdd,
  Email,
} from '@material-ui/icons';

const AboutMe = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.post.myPosts);
  const me = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  if (myPosts !== null && myPosts.length === 0) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <div>
      <div className={classes.profileBanner}></div>
      <Container maxWidth="md">
        <Grid container className={classes.root}>
          <Grid
            component={Paper}
            elevation={0}
            item
            xs={12}
            className={classes.userTopDetails}
          >
            <Avatar alt="user avatar" className={classes.avatar}>
              {me.avatar ? (
                <Image
                  cloudName="dsmrt6yiw"
                  publicId={me.avatar}
                  width="100%"
                />
              ) : null}
            </Avatar>
            <Typography className={classes.username} variant="h4">
              {me.name}
            </Typography>
            <div>
              <Typography variant="body2" className={classes.userDescription}>
                {me.about}
              </Typography>
            </div>
            <div className={classes.userDetails}>
              <div className={classes.iconContainer}>
                <LocationOn className={classes.icon} />
              </div>

              <div className={classes.iconContainer}>
                <Cake className={classes.icon} />
              </div>

              <div className={classes.iconContainer}>
                <Twitter className={classes.iconSocialLink} />
              </div>

              <div className={classes.iconContainer}>
                <Facebook className={classes.iconSocialLink} />
              </div>

              <div className={classes.iconContainer}>
                <GitHub className={classes.iconSocialLink} />
              </div>

              <div className={classes.iconContainer}>
                <Instagram className={classes.iconSocialLink} />
              </div>

              <div className={classes.iconContainer}>
                <Web className={classes.iconSocialLink} />
              </div>
              <div className={classes.iconContainer}>
                <Email className={classes.iconSocialLink} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box
                  component={Paper}
                  elevation={0}
                  className={classes.postsDetails}
                >
                  <div className={classes.postsDetailsItem}>
                    <Tag className={classes.icon} />
                    <Typography
                      variant="body1"
                      className={classes.postsDetailsTypo}
                    >
                      {me.followTags.length} tags followed
                    </Typography>
                  </div>
                  <div className={classes.postsDetailsItem}>
                    <PostAdd className={classes.icon} />
                    <Typography
                      variant="body1"
                      className={classes.postsDetailsTypo}
                    >
                      {myPosts && myPosts.length} posts published
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                {myPosts !== null
                  ? myPosts.map((post) => (
                      <div
                        style={{ textDecoration: 'none', color: 'black' }}
                        key={post._id}
                      >
                        <PostItem post={post} />
                      </div>
                    ))
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutMe;
