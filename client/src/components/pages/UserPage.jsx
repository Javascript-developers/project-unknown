import React, { useEffect } from 'react';
import { useParams } from 'react-router';
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

import { getUserPosts } from '../../store/post/post-actions';
import { getUser } from '../../store/user/user-actions';
import { userActions } from '../../store/user/user-slice';
import { postActions } from '../../store/post/post-slice';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../../styles/profile/my-profile.styles';

import Footer from '../layout/Footer';
import FollowButton from '../layout/FollowButton';

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

const UserPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const visitedUserPosts = useSelector((state) => state.post.userPosts);
  const visitedUser = useSelector((state) => state.user.user);
  const postUserFollowing = useSelector(
    (state) => state.user.currentPostUserFollowing
  );
  const me = useSelector((state) => state.user.currentUser);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUserPosts(id));
    return () => {
      dispatch(userActions.cleanUpUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (visitedUser !== null && me !== null) {
      const followers = visitedUser.followers.map((user) => user._id);
      dispatch(
        userActions.checkFollowing({
          followers: followers,
          me: me._id,
        })
      );
    }
    // console.log('FOLLOWING', postUserFollowing);
  }, [visitedUser, me]);

  const clickFollowButton = (followApi) => {
    dispatch(followApi(visitedUser.id));
  };

  return (
    <>
      {visitedUser !== null ? (
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
                  {visitedUser.avatar ? (
                    <Image
                      cloudName="dsmrt6yiw"
                      publicId={visitedUser.avatar}
                      width="100%"
                    />
                  ) : null}
                </Avatar>
                <Typography className={classes.username} variant="h4">
                  {visitedUser.name}
                </Typography>
                <div>
                  <Typography
                    variant="body2"
                    className={classes.userDescription}
                  >
                    {visitedUser.about}
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
                <div className={classes.buttons}>
                  <div className={classes.bannerButtons}>
                    <FollowButton
                      profile={true}
                      following={postUserFollowing}
                      onButtonClick={clickFollowButton}
                    />
                  </div>
                  <div className={classes.bannerButtons}>
                    <Button sx={{ width: '100%' }} variant="outlined">
                      Send Dm
                    </Button>
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
                          {visitedUser.followTags.length} tags followed
                        </Typography>
                      </div>
                      <div className={classes.postsDetailsItem}>
                        <PostAdd className={classes.icon} />
                        <Typography
                          variant="body1"
                          className={classes.postsDetailsTypo}
                        >
                          {visitedUserPosts && visitedUserPosts.length} posts
                          published
                        </Typography>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    {visitedUserPosts !== null
                      ? visitedUserPosts.map((post) => (
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UserPage;

// <div>
// {/* {visitedUser ? <div>{visitedUser.user.name}</div> : <Spinner />} */}
// <div>
//   {visitedUserPosts ? (
//     visitedUserPosts.map((post) => (
//       <div
//         style={{ textDecoration: 'none', color: 'black' }}
//         key={post._id}
//       >
//         <PostItem post={post} />
//       </div>
//     ))
//   ) : (
//     <Spinner />
//   )}
// </div>
// </div>
