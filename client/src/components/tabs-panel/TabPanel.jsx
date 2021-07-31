import React, { useState } from 'react';

import { Typography, Container, Grid, Box } from '@material-ui/core';

import { Redirect } from 'react-router-dom';
import useStyles from '../../styles/tab-panel/tab-panel.styles';

const Settings = ({ tabs, query, tabTitle }) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const selectTab = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {tabTitle}
      </Typography>
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
                    <Typography
                      variant="h6"
                      className={
                        tab.tabNo === tabValue ? classes.activeTabText : null
                      }
                    >
                      {tab.tabName}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item className={classes.tabPanelContainer} xs={12} md={10}>
          {tabs.map(
            (tab, i) =>
              tab.tabNo === tabValue && <div key={i}>{tab.component}</div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
