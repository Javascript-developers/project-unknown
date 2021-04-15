import React, { useEffect, useContext } from 'react';
import PostContext from '../../context/post/postContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../layout/Spinner';

import Comment from '../layout/Comment';

const Post = () => {
  let { id } = useParams();

  const postContext = useContext(PostContext);
  const { getCurrentPost, currentPost, getUser, user, cleanUp } = postContext;

  useEffect(() => {
    getCurrentPost(id);
  }, []);

  useEffect(() => {
    if (currentPost) {
      getUser(currentPost.user.id);
    }
    return () => {
      if (currentPost) {
        cleanUp();
      }
    };
  }, [currentPost]);

  // console.log();

  // console.log(user);

  return (
    <Container>
      {currentPost !== null ? (
        <PostContainer>
          <LeftContainer>
            <Title>{currentPost.title}</Title>
            <PostHeader>
              <Tags>Technology</Tags>
              <div>
                <p>{currentPost.user.name}</p>
                <Date>{currentPost.createdAt}</Date>
              </div>
            </PostHeader>
            <PostBody>{currentPost.postBody}</PostBody>
            <PostFooter></PostFooter>

            <CommentsSection>
              {currentPost.comments.map((com, i) => (
                <Comment key={i} comment={com} />
              ))}
            </CommentsSection>
          </LeftContainer>
          <RightContainer>
            {user !== null ? <div>{user.name}</div> : <Spinner />}
          </RightContainer>
        </PostContainer>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Post;

const Container = styled.div`
  width: 1600px;
  margin: 0 auto;
  border: 1px solid red;

  @media (max-width: 400px) {
    display: block;
  }
`;
const LeftContainer = styled.div`
  border: 1px solid blue;
  width: 65%;
`;

const RightContainer = styled.div`
  width: 30%;
  border: 1px solid green;
`;

const PostContainer = styled.div`
  border: 1px solid yellow;

  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const PostHeader = styled.div`
  border: 1px solid blue;
  margin-bottom: 15px;

  display: flex;
  justify-content: space-between;
  margin-left: -5px;

  div {
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
  }
`;
const Tags = styled.div``;
const PostBody = styled.div`
  margin-bottom: 15px;
`;
const PostFooter = styled.div`
  margin-bottom: 15px;
`;
const Date = styled.div``;
const CommentsSection = styled.div``;
