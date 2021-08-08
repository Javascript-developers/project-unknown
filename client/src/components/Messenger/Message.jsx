import React, { useEffect } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Image } from 'cloudinary-react';

import { format } from 'timeago.js';

import useStyles from '../../styles/messenger/message.styles';
import { fetchConversationUser } from '../../store/messenger/messenger-actions';
import { useSelector, useDispatch } from 'react-redux';

const Message = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { REACT_APP_CLOUDINARY_NAME } = process.env;

  const currentUser = useSelector((state) => state.user.currentUser);
  const convUser = useSelector((state) => state.messenger.convUser);

  useEffect(() => {
    const user = props.currentChat.members.find(
      (user) => user !== currentUser._id
    );

    dispatch(fetchConversationUser(user));
  }, [props.message]);

  return (
    <div className={classes.root}>
      <div className={classes.messageTop}>
        {!props.own && (
          <Avatar alt="User Avatar" className={classes.avatar}>
            <Image
              cloudName={REACT_APP_CLOUDINARY_NAME}
              publicId={convUser && convUser.avatar}
              width="100%"
            />
          </Avatar>
        )}
        <Typography variant="body1" className={classes.text}>
          {props.message.text}
        </Typography>
      </div>
      <Typography variant="body2" className={classes.messageBottom}>
        {format(props.message.createdAt)}
      </Typography>
    </div>
  );
};

export default Message;
