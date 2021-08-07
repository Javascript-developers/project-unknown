import React from 'react';
import { Avatar, Typography } from '@material-ui/core';

import useStyles from '../../styles/messenger/message.styles';

const Message = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.messageTop}>
        {!props.own && (
          <Avatar alt="User Avatar" className={classes.avatar}></Avatar>
        )}
        <Typography variant="body1" className={classes.text}>
          when an unknown printer took a galley of type and scrambled it to make
        </Typography>
      </div>
      <Typography variant="body2" className={classes.messageBottom}>
        1 hour ago
      </Typography>
    </div>
  );
};

export default Message;
