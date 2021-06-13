import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { getMyPosts } from '../../store/post/post-actions';
import { useDispatch, useSelector } from 'react-redux';

const AboutMe = () => {
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.post.myPosts);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  if (myPosts !== null && myPosts.length === 0) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <Container>
      <Title>My Posts</Title>
      <div className="container-div">
        {myPosts !== null ? (
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
