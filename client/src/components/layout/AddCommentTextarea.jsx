import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextareaAutosize,
  Button,
} from '@material-ui/core';

import useStyles from '../../styles/layout/addComment-textarea.styles';

const AddCommentTextarea = ({ submit, dismiss }) => {
  const classes = useStyles();
  const [text, setText] = useState({ comment: '' });

  const { comment } = text;

  const onChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  const sendReply = () => {
    if (comment > '') {
      submit(comment);
      setText({
        ...text,
        comment: '',
      });
    } else {
      console.error('reply comment is empty');
    }
  };
  const dismissReply = () => {
    dismiss();
  };

  return (
    <div>
      <TextareaAutosize
        className={classes.textarea}
        minRows={3}
        maxRows={5}
        value={comment}
        name="comment"
        onChange={onChange}
        placeholder="Start writing a reply comment"
      />
      <div>
        <Button size="small" variant="contained" onClick={sendReply}>
          Submit
        </Button>
        <Button size="small" variant="text" onClick={dismissReply}>
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default AddCommentTextarea;
