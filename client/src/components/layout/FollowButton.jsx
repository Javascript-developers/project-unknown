import React from 'react';
import Button from '@material-ui/core/Button';

import { followUser, unfollowUser } from '../../store/user/user-actions';
import { followTag, unfollowTag } from '../../store/tags/tag-actions';

const FollowButton = (props) => {
  const followClick = () => {
    props.onButtonClick(props.profile ? followUser : followTag);
  };
  const unfollowClick = () => {
    props.onButtonClick(props.profile ? unfollowUser : unfollowTag);
  };

  return (
    <div>
      {props.following ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={unfollowClick}
          sx={{ width: '100%' }}
          disableElevation
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={followClick}
          sx={{ width: '100%' }}
          disableElevation
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowButton;
