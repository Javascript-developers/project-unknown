import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const Comment = ({ comment }) => {
  const postContext = useContext(PostContext);
  const { deleteCommentOnPost, getCommentsFromPost } = postContext;

  const authContext = useContext(AuthContext);
  const { currentUser, loadUser } = authContext;

  const [deletingComment, setDeletingComment] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const removeComment = () => {
    deleteCommentOnPost(comment.post, comment.id);
    setDeletingComment(true);
    setTimeout(() => {
      getCommentsFromPost(comment.post);
      setDeletingComment(null);
    }, 700);
  };
  // removeButton
  // comment.user.id === currentUser.id
  //FIXME: Spinner is too big, needs resizing
  return (
    <Container>
      <CommentAuthor>{comment.user.name}</CommentAuthor>
      <CommentBody>{comment.comment}</CommentBody>
      {currentUser !== null && comment.user.id === currentUser.id ? (
        <ButtonRemove onClick={removeComment}>Remove</ButtonRemove>
      ) : null}
      <DivSpinner>{deletingComment ? <Spinner /> : null}</DivSpinner>
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

const ButtonRemove = styled.button`
  &:hover {
    color: red;
  }
`;

const DivSpinner = styled.div`
  width: 30px;
  height: 30px;
`;
