import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostItem = ({ post }) => {
  let currentPost = post;

  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { currentUser } = authContext;
  const { likePost, unlikePost, currentPostLiked, cleanUp } = postContext;

  const [liked, setliked] = useState(false);

  //DUPLICATE CODE IN useEffect => must get cleaner solution
  //results in to many API calls each time you like/unlike a post
  //might affect performance

  useEffect(async () => {
    if (currentUser) {
      const currentLiked = post.likes.includes(currentUser.id);
      if (currentLiked) {
        const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
        currentPost = likedPost.data.data.post;
        console.log('LIKED POST', likedPost);
        setliked(true);
      }

      if (!currentLiked) {
        const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
        currentPost = likedPost.data.data.post;
        console.log('UNLIKED POST', likedPost);
        setliked(false);
      }
    }
  }, []);

  useEffect(async () => {
    if (currentUser) {
      const currentLiked = post.likes.includes(currentUser.id);
      if (currentLiked) {
        const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
        currentPost = likedPost.data.data.post;
        console.log('LIKED POST', likedPost);
      }

      if (!currentLiked) {
        const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
        currentPost = likedPost.data.data.post;
        console.log('UNLIKED POST', likedPost);
      }
    }

    setTimeout(() => {
      console.log('CLEAN UP');
      cleanUp();
    }, 1000);
  }, [currentPostLiked]);

  const onLikePost = () => {
    if (liked) {
      unlikePost(post.id);
      setliked(false);
    }
    if (!liked) {
      likePost(post.id);
      setliked(true);
    }
  };

  const likeUnlike = liked ? 'fas fa-heart' : 'far fa-heart';

  // <Link to={`/post/${post._id}`}>
  return (
    <Container>
      <Header>
        <Title>
          <h3>{currentPost.title}</h3>
          <p className="author-post">@{currentPost.user.name}</p>
        </Title>
        <Tags>{currentPost.tags}</Tags>
      </Header>
      <div className="bottom-post">
        <Description>
          <p>Description of the post/ not implemented yet</p>
        </Description>
        <SocialContainer>
          <div className="likes-comments-container">
            <Likes onClick={onLikePost}>
              <i className={likeUnlike} /> {currentPost.likes.length}
            </Likes>
            <Comments>
              <i className="far fa-comment" /> {currentPost.comments.length}
            </Comments>
          </div>
          <Date>
            <p>
              <strong>Date: </strong>
              {currentPost.createdAt}
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

const Likes = styled.div`
  i {
    border-radius: 50%;
    color: red;
    padding: 5px;
    &:hover {
      background-color: salmon;
    }
  }
`;

const Comments = styled.div``;

const Date = styled.div`
  color: #8191a0;
`;
