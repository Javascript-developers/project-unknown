import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingPosts } from '../../store/post/post-actions';

const TrendingPosts = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.post.trending);

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  if (trending !== null && trending.length === 0) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <Container>
      <div className="container-div">
        {trending !== null ? (
          trending.map((post) => (
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
    </Container>
  );
};

export default TrendingPosts;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
