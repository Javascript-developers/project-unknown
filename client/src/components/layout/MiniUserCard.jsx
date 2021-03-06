import React from 'react';

import { Avatar, Paper, Grid, Typography } from '@material-ui/core';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

import useStyles from '../../styles/layout/miniUserCard.styles';

const MiniUserCard = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid component={Paper} className={classes.root} elevation={0}>
      <Avatar alt="User Avatar" className={classes.avatar}>
        {user.avatar ? (
          <Image cloudName={'dsmrt6yiw'} publicId={user.avatar} width="100%" />
        ) : null}
      </Avatar>
      <Link className={classes.titleLink} to={`/user/${user.username}`}>
        <Typography variant="h5">{user.name}</Typography>
      </Link>
      <Typography variant="body1">@{user.username}</Typography>
    </Grid>
  );
};

export default MiniUserCard;
