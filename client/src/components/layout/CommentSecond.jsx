import React, { useEffect, useState, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Image } from 'cloudinary-react';

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

import { useSelector } from 'react-redux';

const CommentSecond = ({ comment, onRemove }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [deletingComment, setDeletingComment] = useState(null);

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const removeComment = () => {
    handleCloseMenu();
    onRemove(comment.post, comment.id);
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
                {comment.user.name} •{' '}
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
        <Button>Reply</Button>
      </Grid>
    </Grid>
  );
};

export default CommentSecond;
