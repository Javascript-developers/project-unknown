import React, { useEffect, useContext } from 'react';
import PostContext from '../../context/post/postContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Post = () => {
  let { id } = useParams();

  useEffect(() => {
    getCurrentPost(id);
  }, []);

  const postContext = useContext(PostContext);
  const { getCurrentPost, currentPost } = postContext;

  console.log(currentPost);

  if (currentPost === null) {
    return <div>Post can't be found</div>;
  }
  return (
    <Container>
      {currentPost !== null && !false ? (
        <PostContainer>
          <Title>{currentPost.title}</Title>
        </PostContainer>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Post;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  border: 1px solid red;
`;

const PostContainer = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;
