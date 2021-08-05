import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

import * as moment from 'moment';
import useStyles from '../../styles/layout/comment.styles';

import {
  Divider,
  Avatar,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Reply from '../layout/Reply';
import AddCommentTextarea from '../layout/AddCommentTextarea';

import {
  createReplyOnComment,
  deleteReplyOnComment,
} from '../../store/post/post-actions';

import { useSelector, useDispatch } from 'react-redux';

const Comment = ({ comment, onRemove }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [deletingComment, setDeletingComment] = useState(null);

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [showTextarea, setShowTextarea] = useState(false);

  // useEffect(() => {
  //   dispatch(createReplyOnComment())
  // }, [])

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const activateReply = () => {
    setShowTextarea(true);
  };

  const removeComment = () => {
    handleCloseMenu();
    onRemove(comment.post, comment.id);
  };

  const onSubmitReply = (reply) => {
    dispatch(createReplyOnComment(comment._id, reply, currentUser._id));
  };
  const onDismissReply = () => {
    setShowTextarea(false);
  };

  const removeReply = (commentId, replyId) => {
    dispatch(deleteReplyOnComment(commentId, replyId));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <Avatar alt="user avatar" className={classes.avatar}>
          {comment.user.avatar ? (
            <Image
              cloudName="dsmrt6yiw"
              publicId={comment.user.avatar}
              width="100%"
              // crop="scale"
            />
          ) : null}
        </Avatar>
      </Grid>
      <Grid item xs={11}>
        <div className={classes.commentContainer}>
          <Grid container className={classes.commentTitle}>
            <Grid item xs={6}>
              <Typography variant="" className={classes.commentUsername}>
                <Link
                  className={classes.commentUsernameLink}
                  to={`/user/${comment.user.username}`}
                >
                  {comment.user.name}
                </Link>{' '}
                •{' '}
                <span className={classes.date}>
                  {comment.createdAt !== null
                    ? moment(
                        comment.createdAt.toString(),
                        'YYYYMMDD HH:mm:ss'
                      ).fromNow()
                    : 'just now...'}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.menuItem}>
              <div>
                <IconButton
                  size="small"
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorMenu)}
                  onClose={handleCloseMenu}
                >
                  {currentUser !== null &&
                  comment.user.id === currentUser.id ? (
                    <MenuItem onClick={removeComment}>Remove</MenuItem>
                  ) : (
                    <MenuItem onClick={handleCloseMenu}>No options</MenuItem>
                  )}
                </Menu>
              </div>
            </Grid>
          </Grid>
          <Typography className={classes.comment}>{comment.comment}</Typography>
        </div>
        {!showTextarea && <Button onClick={activateReply}>Reply</Button>}
        {showTextarea && (
          <AddCommentTextarea submit={onSubmitReply} dismiss={onDismissReply} />
        )}
        <div className={classes.replyContainer}>
          {comment.replies.map((reply, i) => (
            <Reply
              key={i}
              reply={reply}
              onRemove={removeReply}
              commentId={comment._id}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Comment;
