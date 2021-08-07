import React, { useState } from 'react';
import { Typography, TextareaAutosize, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons/';

import useStyles from '../../styles/messenger/chat-textarea.styles';

const ChatTextarea = ({ submit }) => {
  const classes = useStyles();
  const [text, setText] = useState({ chatText: '' });

  const { chatText } = text;

  const onChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  const sendChatText = () => {
    if (chatText > '') {
      //   submit(chatText);
      alert('chat sent');
      setText({
        ...text,
        chatText: '',
      });
    } else {
      console.error('chat input is empty');
    }
  };

  return (
    <>
      <TextareaAutosize
        icon={<Send />}
        className={classes.textarea}
        minRows={3}
        maxRows={5}
        value={chatText}
        name="chatText"
        onChange={onChange}
        placeholder="write something..."
      />
      <Button
        className={classes.chatSubmitButton}
        size="small"
        variant="contained"
        onClick={sendChatText}
        endIcon={<Send />}
      >
        Submit
      </Button>
    </>
  );
};

export default ChatTextarea;
