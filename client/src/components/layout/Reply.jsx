import React, { useState } from 'react';
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
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

import * as moment from 'moment';
import useStyles from '../../styles/layout/comment.styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useSelector, useDispatch } from 'react-redux';

const Reply = ({ reply, onRemove, commentId }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log(reply);

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const removeReplyComment = () => {
    handleCloseMenu();
    onRemove(commentId, reply._id);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <Avatar alt="user avatar" className={classes.avatar}>
          {reply.user.avatar ? (
            <Image
              cloudName="dsmrt6yiw"
              publicId={reply.user.avatar}
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
                  to={`/user/${reply.user.id}`}
                >
                  {reply.user.name}
                </Link>{' '}
                •{' '}
                <span className={classes.date}>
                  {reply.createdAt !== null
                    ? moment(
                        reply.createdAt.toString(),
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
                  {currentUser !== null && reply.user._id === currentUser.id ? (
                    <MenuItem onClick={removeReplyComment}>Remove</MenuItem>
                  ) : (
                    <MenuItem onClick={handleCloseMenu}>No options</MenuItem>
                  )}
                </Menu>
              </div>
            </Grid>
          </Grid>
          <Typography className={classes.comment}>
            {reply.replyComment}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Reply;
