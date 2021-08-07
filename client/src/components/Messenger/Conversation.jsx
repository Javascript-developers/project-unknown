import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { Image } from 'cloudinary-react';

import useStyles from '../../styles/messenger/conversation.styles';

const Conversation = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt="User Avatar" className={classes.avatar}></Avatar>
      <Typography variant="h6" className={classes.conversationName}>
        User Name
      </Typography>
    </div>
  );
};

export default Conversation;
