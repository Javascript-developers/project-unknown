import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingPosts } from '../../store/post/post-actions';
import { bookmarkPost, unBookmarkPost } from '../../store/user/user-actions';

const TrendingPosts = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.post.trending);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  const bookmarkOnPost = (callApi, postId) => {
    const f = callApi === 'bookmark' ? bookmarkPost : unBookmarkPost;
    dispatch(f(postId));
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
                bookmarkOnPost={bookmarkOnPost}
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
