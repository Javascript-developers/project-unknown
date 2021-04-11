import React from 'react';
import styled from 'styled-components';

const PostItem = ({ post }) => {
  return (
    <Container>
      <Header>
        <Title>
          <h3>{post.title}</h3>
          <p className="author-post">@{post.user.name}</p>
        </Title>
        <Tags>{post.tags}</Tags>
      </Header>
      <div className="bottom-post">
        <Description>
          <p>{post.postBody}</p>
        </Description>
        <SocialContainer>
          <div className="likes-comments-container">
            <Likes>
              <i className="far fa-heart">{post.likes}</i>
            </Likes>
            <Comments>
              <i className="far fa-comment">{post.comments.length}</i>
            </Comments>
          </div>
          <Date>
            <p>
              <strong>Date: </strong>
              {post.createdAt}
            </p>
          </Date>
        </SocialContainer>
      </div>
    </Container>
  );
};

export default PostItem;

const Container = styled.div`
  width: 100%;
  height: 160px;
  /* border: 1px solid red; */
  background: #ffffff;
  padding: 15px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;

  &:hover {
    background: #f7f9fa;
  }

  .bottom-post {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  color: rgba(#fff, 0.85);
  .author-post {
    color: #8191a0;
  }
`;

const Tags = styled.div``;

const Description = styled.div``;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .likes-comments-container {
    display: flex;
    i {
      margin: 0 10px 0 0;
    }
  }
`;

const Likes = styled.div``;

const Comments = styled.div``;

const Date = styled.div`
  color: #8191a0;
`;
