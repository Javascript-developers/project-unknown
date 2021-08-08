import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, Typography, InputBase } from "@material-ui/core";

import useStyles from "../../styles/messenger/messenger-page.styles";
import Conversation from "../Messenger/Conversation";
import Message from "../Messenger/Message";
import ChatTextarea from "../Messenger/ChatTextarea";
import ChatOnline from "../Messenger/ChatOnline";

import { io } from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyConversations,
  fetchConversationMessages,
  sendNewChatMessage,
} from "../../store/messenger/messenger-actions";
import { messengerActions } from "../../store/messenger/messenger-slice";

const Messenger = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.messenger.conversations);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChat = useSelector((state) => state.messenger.currentChat);
  const messages = useSelector((state) => state.messenger.messages);

  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage !== null) {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        dispatch(messengerActions.addNewMessage(arrivalMessage));
    }

    console.log(arrivalMessage);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [currentUser]);

  const scrollRef = useRef();

  useEffect(() => {
    dispatch(fetchMyConversations());
  }, [dispatch]);

  useEffect(() => {
    if (currentChat) {
      dispatch(fetchConversationMessages(currentChat._id));
    }
  }, [currentChat]);

  const setCurrentChat = (conv) => {
    dispatch(messengerActions.addCurrentChat(conv));
  };

  useEffect(() => {
    //scrolling chat messages down to last message
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmitNewMessage = (newMessage) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    dispatch(
      sendNewChatMessage({
        conversationId: currentChat._id,
        sender: currentUser._id,
        text: newMessage,
      })
    );
  };

  return (
    <Container maxWidth='xl' className={classes.root}>
      <Grid container>
        <Grid item className={classes.chatFriends} xs={3}>
          <Grid container className={classes.chatFriendsWrapper}>
            <InputBase
              className={classes.inputBase}
              placeholder='Search friends...'
              inputProps={{ "aria-label": "search friends" }}
              // value={input}
              // onChange={onChange}
              // onKeyPress={handleKeyPress}
            />
            {conversations.map((conv, i) => (
              <div key={i} onClick={() => setCurrentChat(conv)}>
                <Conversation conversation={conv} currentUser={currentUser} />
              </div>
            ))}
          </Grid>
        </Grid>
        <Grid item className={classes.chatBox} xs={6}>
          <div className={classes.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={classes.chatBoxTop}>
                  {messages?.map((msg, i) => (
                    <div key={i} ref={scrollRef}>
                      <Message
                        currentChat={currentChat}
                        message={msg}
                        own={msg.sender === currentUser._id}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.chatBoxBottom}>
                  <ChatTextarea submit={onSubmitNewMessage} />
                </div>
              </>
            ) : (
              <Typography
                variant='body1'
                className={classes.noConversationText}
              >
                Open a conversation to start a chat.
              </Typography>
            )}
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
