import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import PostContext from '../../context/post/postContext';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const UserPage = () => {
  const postContext = useContext(PostContext);
  const { visitedUserPosts, visitUser } = postContext;

  const { id } = useParams();

  useEffect(() => {
    visitUser(id);
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
