import React from 'react';

import TrendingPosts from '../layout/TrendingPosts';
import NewestPosts from '../layout/NewestPosts';
import SocialLinks from '../layout/SocialLinks';
import CreatePostModal from '../layout/CreatePostModal';
import { Box, Container, Grid, Divider, Typography } from '@material-ui/core';

import QuickLinks from '../layout/QuickLinks';
import MyQuickTags from '../layout/MyQuickTags';
import Footer from '../layout/Footer';

import useStyles from '../../styles/homepage.styles';

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid
                display={{ xs: 'none', sm: 'block' }}
                item
                md={2}
                className={classes.leftMenu}
              >
                <QuickLinks />
                <MyQuickTags />
              </Grid>
              <Grid item xs={12} sm={8} md={7} className={classes.feed}>
                <TrendingPosts />
              </Grid>
              <Grid item md={3} className={classes.rightMenu}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;

{
  /* <Container maxWidth="lg">
<Box sx={{ flexGrow: 1, marginTop: '25px' }}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={8}>
      <Typography variant="h6">Feed</Typography>
      <Divider />
      <TrendingPosts />
    </Grid>
    <Grid item xs>
      <Typography variant="h6">Follow me</Typography>
      <Divider />
      <SocialLinks />
      <Typography variant="h6">Newest Posts</Typography>
      <Divider />
    </Grid>
  </Grid>
</Box>
</Container> */
}
