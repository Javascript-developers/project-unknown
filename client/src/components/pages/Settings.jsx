import React, { useState } from 'react';

import { Typography, Container, Grid, Box } from '@material-ui/core';

import ProfilePanel from '../settings/ProfilePanel';
import CustomizationPanel from '../settings/CustomizationPanel';
import AccountPanel from '../settings/AccountPanel';
import Footer from '../layout/Footer';

import { Redirect } from 'react-router-dom';
import useStyles from '../../styles/settings/settings-page.styles';

const tabs = [
  { tabName: 'Profile', tabNo: 0 },
  { tabName: 'Customization', tabNo: 1 },
  { tabName: 'Account', tabNo: 2 },
];

const Settings = () => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const selectTab = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <div className={classes.titlePage}>
          <Typography variant="h4">
            Settings for <span className={classes.spanUserTitle}>@user</span>
          </Typography>
        </div>

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
            {tabValue === 0 && <ProfilePanel />}
            {tabValue === 1 && <CustomizationPanel />}
            {tabValue === 2 && <AccountPanel />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Settings;

// <Container maxWidth="xs">
//   <div>
//     <Avatar
//       sx={{
//         bgcolor: deepOrange[500],
//         width: 100,
//         height: 100,
//         margin: '0 auto',
//       }}
//       src={user.avatar ?? user.avatar}
//     >
//       <LockOutlinedIcon />
//     </Avatar>
//     <Typography component="h1" variant="h5">
//       Edit Profile
//     </Typography>
//   </div>

//   <form onSubmit={onSubmit}>
//     <input
//       // accept="image/*"
//       accept=".png, .jpg, .jpeg"
//       type="file"
//       name="avatar"
//       value={fileInputState}
//       onChange={handleFileInputChange}
//       style={{ display: 'none' }}
//       id="icon-button-file"
//     />
//     <label htmlFor="icon-button-file">
//       <Button variant="contained" component="span">
//         Upload Avatar Image <FileUpload />
//       </Button>
//     </label>
//     <TextField
//       variant="outlined"
//       margin="normal"
//       fullWidth
//       label="Name"
//       name="name"
//       autoComplete="name"
//       autoFocus
//       value={name}
//       onChange={onChange}
//     />
//     <TextField
//       variant="outlined"
//       margin="normal"
//       fullWidth
//       label="About"
//       name="about"
//       autoComplete="about"
//       autoFocus
//       value={about}
//       onChange={onChange}
//     />
//     <Button type="submit" fullWidth variant="contained" color="primary">
//       Submit Changes
//     </Button>
//   </form>
// </Container>
