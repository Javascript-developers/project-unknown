import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import PostContext from '../../context/post/postContext';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const AboutMe = () => {
  const postContext = useContext(PostContext);
  const { myPosts, getMyPosts, loading, currentPostLiked } = postContext;

  useEffect(() => {
    getMyPosts();
  }, []);

  useEffect(() => {
    getMyPosts();
  }, [currentPostLiked]);

  if (myPosts !== null && myPosts.length === 0) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <Container>
      <Title>My Posts</Title>
      <div className="container-div">
        {myPosts !== null && !loading ? (
          myPosts.map((post) => (
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

export default AboutMe;

const Container = styled.div``;
const Title = styled.h3`
  color: #8191a0;
  hr {
    border-top: rgb(235, 238, 240);
  }
`;
