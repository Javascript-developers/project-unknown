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

import { getUser } from '../../store/user/user-actions';

import { getUserPosts } from '../../store/post/post-actions';
import { getUserByUsername } from '../../store/user/user-actions';
import { userActions } from '../../store/user/user-slice';
import { postActions } from '../../store/post/post-slice';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../../styles/profile/my-profile.styles';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

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
import LinkIcon from '@material-ui/icons/Link';

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
    dispatch(getUserByUsername(id));
    // dispatch(getUser(id));

    return () => {
      dispatch(userActions.cleanUpUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (visitedUser !== null) {
      console.log('VISITED-USER', visitedUser);
      dispatch(getUserPosts(visitedUser._id));
    }
  }, [visitedUser]);

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
                <Typography className={classes.name} variant="h4">
                  {visitedUser.name}
                </Typography>
                <Typography variant="body1" className={classes.username}>
                  @{visitedUser.username}
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
                  {visitedUser.location && (
                    <div className={classes.iconContainerWithText}>
                      <LocationOn className={classes.icon} />
                      <Typography variant="body1" className={classes.iconText}>
                        {visitedUser.location}
                      </Typography>
                    </div>
                  )}
                  {visitedUser.joinDate && (
                    <div className={classes.iconContainerWithText}>
                      <Cake className={classes.icon} />
                      <Typography variant="body1" className={classes.iconText}>
                        Joined on {moment(visitedUser.joinDate).format('LL')}
                      </Typography>
                    </div>
                  )}

                  {visitedUser.twitter && (
                    <div className={classes.iconContainer}>
                      <Link
                        to={{
                          pathname: `https://twitter.com/${visitedUser.twitter}`,
                        }}
                        target="_blank"
                      >
                        <Twitter className={classes.iconSocialLink} />
                      </Link>
                    </div>
                  )}

                  {/* <div className={classes.iconContainer}>
                <Facebook className={classes.iconSocialLink} />
              </div> */}

                  {visitedUser.github && (
                    <div className={classes.iconContainer}>
                      <Link
                        to={{
                          pathname: `https://github.com/${visitedUser.github}`,
                        }}
                        target="_blank"
                      >
                        <GitHub className={classes.iconSocialLink} />
                      </Link>
                    </div>
                  )}

                  {visitedUser.instagram && (
                    <div className={classes.iconContainer}>
                      <Link
                        to={{
                          pathname: `https://instagram.com/${visitedUser.instagram}`,
                        }}
                        target="_blank"
                      >
                        <Instagram className={classes.iconSocialLink} />
                      </Link>
                    </div>
                  )}

                  {visitedUser.website && (
                    <div className={classes.iconContainerWithText}>
                      <Link
                        to={{ pathname: `https://${visitedUser.website}` }}
                        target="_blank"
                        className={classes.websiteLink}
                      >
                        <LinkIcon className={classes.icon} />
                        <Typography
                          variant="body1"
                          className={classes.iconTextWebsite}
                        >
                          {visitedUser.website}
                        </Typography>
                      </Link>
                      {/* <Typography>https://www.yourwebsite.com</Typography> */}
                    </div>
                  )}

                  {visitedUser.showEmail && (
                    <div className={classes.iconContainerWithText}>
                      <Email className={classes.iconSocialLink} />
                      <Typography variant="body1" className={classes.iconText}>
                        {visitedUser.email}
                      </Typography>
                    </div>
                  )}
                </div>
                <div className={classes.buttons}>
                  <div className={classes.bannerButtons}>
                    <FollowButton
                      profile={true}
                      following={postUserFollowing}
                      onButtonClick={clickFollowButton}
                      //TODO: DISABLE BUTTON
                      disableButton={visitedUser.id === me._id}
                    />
                  </div>
                  <div className={classes.bannerButtons}>
                    <Button
                      sx={{ width: '100%' }}
                      variant="outlined"
                      disabled={visitedUser.id === me._id}
                    >
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
                          {visitedUser?.followTags?.length} tags followed
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
