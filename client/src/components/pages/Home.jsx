import React from 'react';

import TrendingPosts from '../layout/TrendingPosts';
import NewestPosts from '../layout/NewestPosts';
import SocialLinks from '../layout/SocialLinks';
import CreatePostModal from '../layout/CreatePostModal';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Home = () => {
  return (
    <Container maxWidth="lg">
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
            {/* <NewestPosts /> */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
