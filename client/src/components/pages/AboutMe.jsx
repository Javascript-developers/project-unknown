import React, { useEffect } from 'react';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { Link } from 'react-router-dom';

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
import * as moment from 'moment';

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
import LinkIcon from '@material-ui/icons/Link';

const AboutMe = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.post.myPosts);
  const me = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  // if (myPosts !== null && myPosts.length === 0) {
  //   return <h4>Please add a post...</h4>;
  // }

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
              {me.location && (
                <div className={classes.iconContainerWithText}>
                  <LocationOn className={classes.icon} />
                  <Typography variant="body1" className={classes.iconText}>
                    {me.location}
                  </Typography>
                </div>
              )}
              {me.joinDate && (
                <div className={classes.iconContainerWithText}>
                  <Cake className={classes.icon} />
                  <Typography variant="body1" className={classes.iconText}>
                    Joined on {moment(me.joinDate).format('LL')}
                  </Typography>
                </div>
              )}

              <div className={classes.userDetailsSocial}>
                {me.twitter && (
                  <div className={classes.iconContainer}>
                    <Link
                      to={{ pathname: `https://twitter.com/${me.twitter}` }}
                      target="_blank"
                    >
                      <Twitter className={classes.iconSocialLink} />
                    </Link>
                  </div>
                )}

                {/* <div className={classes.iconContainer}>
                <Facebook className={classes.iconSocialLink} />
              </div> */}

                {me.github && (
                  <div className={classes.iconContainer}>
                    <Link
                      to={{ pathname: `https://github.com/${me.github}` }}
                      target="_blank"
                    >
                      <GitHub className={classes.iconSocialLink} />
                    </Link>
                  </div>
                )}

                {me.instagram && (
                  <div className={classes.iconContainer}>
                    <Link
                      to={{ pathname: `https://instagram.com/${me.instagram}` }}
                      target="_blank"
                    >
                      <Instagram className={classes.iconSocialLink} />
                    </Link>
                  </div>
                )}
              </div>

              {me.website && (
                <div className={classes.iconContainerWithText}>
                  <Link
                    to={{ pathname: `https://${me.website}` }}
                    target="_blank"
                    className={classes.websiteLink}
                  >
                    <LinkIcon className={classes.icon} />
                    <Typography
                      variant="body1"
                      className={classes.iconTextWebsite}
                    >
                      {me.website}
                    </Typography>
                  </Link>
                  {/* <Typography>https://www.yourwebsite.com</Typography> */}
                </div>
              )}

              {me.showEmail && (
                <div className={classes.iconContainerWithText}>
                  <Email className={classes.iconSocialLink} />
                  <Typography variant="body1" className={classes.iconText}>
                    {me.email}
                  </Typography>
                </div>
              )}
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
