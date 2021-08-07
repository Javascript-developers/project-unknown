import React from 'react';
import { Avatar, Typography, Badge } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';
import { Image } from 'cloudinary-react';

import useStyles from '../../styles/messenger/chat-online.styles';

const ChatOnline = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatOnline}>
      <div className={classes.chatOnlineFriend}>
        <Badge
          color="secondary"
          //   badgeContent=" "
          overlap="circular"
          variant="dot"
          className={classes.avatarBadge}
        >
          <Avatar alt="User Avatar" className={classes.avatar}></Avatar>
        </Badge>
        <Typography variant="body1" className={classes.friendName}>
          User Name
        </Typography>
      </div>
      <div className={classes.chatOnlineFriend}>
        <Badge
          color="secondary"
          //   badgeContent=" "
          overlap="circular"
          variant="dot"
          className={classes.avatarBadge}
        >
          <Avatar alt="User Avatar" className={classes.avatar}></Avatar>
        </Badge>
        <Typography variant="body1" className={classes.friendName}>
          User Name
        </Typography>
      </div>
      <div className={classes.chatOnlineFriend}>
        <Badge
          color="secondary"
          //   badgeContent=" "
          overlap="circular"
          variant="dot"
          className={classes.avatarBadge}
        >
          <Avatar alt="User Avatar" className={classes.avatar}></Avatar>
        </Badge>
        <Typography variant="body1" className={classes.friendName}>
          User Name
        </Typography>
      </div>
    </div>
  );
};

export default ChatOnline;
