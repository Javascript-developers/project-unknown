import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import UserContext from './../../context/user/userContext';

const FollowProfileButton = (props) => {
  const userContext = useContext(UserContext);

  const { followUser, unfollowUser } = userContext;

  const followClick = () => {
    props.onButtonClick(followUser);
  };
  const unfollowClick = () => {
    props.onButtonClick(unfollowUser);
  };

  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowProfileButton;
