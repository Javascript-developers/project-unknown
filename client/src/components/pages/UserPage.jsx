import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { getUserPosts } from '../../store/post/post-actions';
import { useDispatch, useSelector } from 'react-redux';

const UserPage = () => {
  const dispatch = useDispatch();
  const visitedUserPosts = useSelector((state) => state.post.userPosts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserPosts(id));
  }, []);

  return (
    <div>
      {/* {visitedUser ? <div>{visitedUser.user.name}</div> : <Spinner />} */}
      <div>
        {visitedUserPosts ? (
          visitedUserPosts.map((post) => (
            <div
              style={{ textDecoration: 'none', color: 'black' }}
              key={post._id}
            >
              <PostItem post={post} />
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default UserPage;
