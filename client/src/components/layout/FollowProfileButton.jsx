import React from 'react';
import Button from '@material-ui/core/Button';

import { followUser, unfollowUser } from '../../store/user/user-actions';

const FollowProfileButton = (props) => {
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
