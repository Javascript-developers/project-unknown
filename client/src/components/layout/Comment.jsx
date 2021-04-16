import React from 'react';
import styled from 'styled-components';

const Comment = ({ comment }) => {
  return (
    <Container>
      <CommentAuthor>{comment.user.name}</CommentAuthor>
      <CommentBody>{comment.comment}</CommentBody>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  border-top: 1px solid #8191a0;
  margin-bottom: 15px;
  padding-top: 40px;
`;

const CommentAuthor = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const CommentBody = styled.div`
  margin-left: 50px;
`;
