import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PostContext from '../../context/post/postContext';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';

const NewestPosts = () => {
  const postContext = useContext(PostContext);
  const { newest, getNewestPosts } = postContext;

  useEffect(() => {
    getNewestPosts();
  }, []);

  if (newest === null) {
    return <p>No posts can be found!</p>;
  }

  return (
    <Container>
      <PostsContainer>
        {newest.map((post) => (
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/post/${post._id}`}
            key={post._id}
          >
            <PostItem post={post} />
          </Link>
        ))}
      </PostsContainer>
    </Container>
  );
};

export default NewestPosts;

const Container = styled.div`
  width: 100%;
  height: 100%;

  /* border: 1px solid blue; */
  /* .container-div {
    display: grid;
    grid-template-columns: auto auto;
  } */
`;

const Title = styled.h3`
  color: #8191a0;
  hr {
    border-top: rgb(235, 238, 240);
  }
`;

const PostsContainer = styled.div`
  width: 100%;
  height: 100%;

  /* border: 1px solid red; */
`;
