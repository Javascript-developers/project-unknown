import React, { useState } from 'react';
import {
  Typography,
  TextareaAutosize,
  Button,
  InputBase,
} from '@material-ui/core';
import { Send } from '@material-ui/icons/';

import useStyles from '../../styles/messenger/chat-textarea.styles';

const ChatTextarea = ({ submit }) => {
  const classes = useStyles();
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendChatText();
    }
  };

  const sendChatText = () => {
    if (text > '') {
      submit(text);
      setText('');
    } else {
      console.error('chat input is empty');
    }
  };

  return (
    <>
      <InputBase
        autoComplete="off"
        icon={<Send />}
        className={classes.textarea}
        value={text}
        name="text"
        onChange={onChange}
        placeholder="write something..."
        onKeyPress={handleKeyPress}
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
