import React, { useEffect, useContext } from 'react';
import PostContext from '../../context/post/postContext';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const TrendingPosts = () => {
  const postContext = useContext(PostContext);
  const { trending, getTrendingPosts, loading, currentPostLiked } = postContext;

  useEffect(() => {
    getTrendingPosts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTrendingPosts();
  }, [currentPostLiked]);

  if (trending !== null && trending.length === 0 && !loading) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <Container>
      <div className="container-div">
        {trending !== null && !loading ? (
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
  /* margin-top: 20px; */
  /* border: 1px solid blue; */
`;

const Title = styled.h3`
  color: #8191a0;
  hr {
    border-top: rgb(235, 238, 240);
  }
`;
