import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { Image } from 'cloudinary-react';

import useStyles from '../../styles/messenger/conversation.styles';

const Conversation = ({ conversation, currentUser }) => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { REACT_APP_CLOUDINARY_NAME } = process.env;

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/v1/users/${friendId}`);
        setUser(res.data.data.user);
        // console.log(res);
        // return res.data.data.user;
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={classes.root}>
      <Avatar alt="User Avatar" className={classes.avatar}>
        <Image
          cloudName={REACT_APP_CLOUDINARY_NAME}
          publicId={user && user.avatar}
          width="100%"
        />
      </Avatar>
      <Typography variant="h6" className={classes.conversationName}>
        {user && user.name}
      </Typography>
    </div>
  );
};

export default Conversation;
