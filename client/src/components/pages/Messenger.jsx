import React from 'react';
import { Container, Grid, Typography, InputBase } from '@material-ui/core';

import useStyles from '../../styles/messenger/messenger-page.styles';
import Conversation from '../Messenger/Conversation';
import Message from '../Messenger/Message';
import ChatTextarea from '../Messenger/ChatTextarea';
import ChatOnline from '../Messenger/ChatOnline';

const Messenger = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid item className={classes.chatFriends} xs={3}>
          <Grid container className={classes.chatFriendsWrapper}>
            <InputBase
              className={classes.inputBase}
              placeholder="Search friends..."
              inputProps={{ 'aria-label': 'search friends' }}
              // value={input}
              // onChange={onChange}
              // onKeyPress={handleKeyPress}
            />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </Grid>
        </Grid>
        <Grid item className={classes.chatBox} xs={6}>
          <div className={classes.chatBoxWrapper}>
            <div className={classes.chatBoxTop}>
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
            </div>
            <div className={classes.chatBoxBottom}>
              <ChatTextarea />
            </div>
          </div>
        </Grid>
        <Grid item className={classes.chatOnline} xs={3}>
          <Grid container className={classes.chatOnlineWrapper}>
            <ChatOnline />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Messenger;
