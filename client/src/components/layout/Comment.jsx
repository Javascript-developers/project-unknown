import React, { useEffect, useState, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Image } from 'cloudinary-react';

import * as moment from 'moment';

import { Divider, Avatar, Grid } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import { useSelector } from 'react-redux';

const Comment = ({ comment, onRemove }) => {
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

  // removeButton
  // comment.user.id === currentUser.id
  //FIXME: Spinner is too big, needs resizing
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt="user avatar" sx={{ bgcolor: deepOrange[500] }}>
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
      <Grid item justifyContent="left" xs zeroMinWidth>
        <h4 style={{ margin: '0', textAlign: 'left' }}>{comment.user.name}</h4>
        <p style={{ textAlign: 'left' }}>{comment.comment}</p>
        <p style={{ textAlign: 'left', color: 'gray', marginTop: '10px' }}>
          {/* posted 1 minute AGO */}
          {moment(comment.createdAt.toString(), 'YYYYMMDD HH:mm:ss').fromNow()}
        </p>
        {/* {currentUser !== null && comment.user.id === currentUser.id ? (
          <button onClick={removeComment}>Remove</button>
        ) : null} */}
        <div>{deletingComment ? <Spinner /> : null}</div>
        <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
      </Grid>
      <Grid item>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <MoreVertIcon />
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
            {currentUser !== null && comment.user.id === currentUser.id ? (
              <MenuItem onClick={removeComment}>Remove</MenuItem>
            ) : (
              <MenuItem onClick={handleCloseMenu}>No options</MenuItem>
            )}
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
};

export default Comment;
