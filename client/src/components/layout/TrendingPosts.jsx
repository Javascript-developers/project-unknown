import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTrendingPosts,
  likePost,
  unlikePost,
} from '../../store/post/post-actions';

const TrendingPosts = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.post.trending);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  const likeOnPost = (callApi, postId, currentUserId) => {
    const f = callApi === 'likePost' ? likePost : unlikePost;
    dispatch(f(postId, currentUserId));
  };

  if (trending !== null && trending.length === 0) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <Container>
      <div className="container-div">
        {trending !== null && currentUser !== null ? (
          trending.map((post) => (
            <div
              style={{ textDecoration: 'none', color: 'black' }}
              key={post._id}
            >
              <PostItem
                post={post}
                user={currentUser}
                likeOnPost={likeOnPost}
              />
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </Container>
  );
};

export default TrendingPosts;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
