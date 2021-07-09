import React, { useState, useEffect } from 'react';

import { Typography, Container, Box, Grid } from '@material-ui/core';
import useStyles from '../../styles/dashboard/dashboard.styles';

import PostsPannel from '../dashboard/PostsPanel';
import FollowingUsersPannel from '../dashboard/FollowingUsersPanel';
import FollowingTagsPannel from '../dashboard/FollowingTagsPanel';
import AnalyticsPannel from '../dashboard/AnalyticsPanel';
import FollowersPannel from '../dashboard/FollowersPanel';

import { useDispatch } from 'react-redux';
import { getFollowers, getFollowing } from '../../store/user/user-actions';

const tabs = [
  { tabName: 'Posts', tabNo: 0 },
  { tabName: 'Followers', tabNo: 1 },
  { tabName: 'Following users', tabNo: 2 },
  { tabName: 'Following tags', tabNo: 3 },
  { tabName: 'Analytics', tabNo: 4 },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getFollowers());
    dispatch(getFollowing());
  }, [dispatch]);

  const selectTab = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.tabsContainer}>
        <Grid item xs={12} md={2}>
          <Grid container className={classes.tabLabelsContainer}>
            {tabs.map((tab, i) => {
              return (
                <Grid item key={i}>
                  <Box
                    className={
                      tab.tabNo === tabValue
                        ? classes.tabLabelActive
                        : classes.tabLabel
                    }
                    onClick={() => selectTab(tab.tabNo)}
                  >
                    <Typography variant="h6">{tab.tabName}</Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item className={classes.tabPanelContainer} xs={12} md={10}>
          {tabValue === 0 && <PostsPannel />}
          {tabValue === 1 && <FollowersPannel />}
          {tabValue === 2 && <FollowingUsersPannel />}
          {tabValue === 3 && <FollowingTagsPannel />}
          {tabValue === 4 && <AnalyticsPannel />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
