import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

import TrendingPosts from '../layout/TrendingPosts';
import NewestPosts from '../layout/NewestPosts';
import SocialLinks from '../layout/SocialLinks';

import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const { createPost, getTrendingPosts, getNewestPosts } = postContext;

  const [createPostState, setCreatePostState] = useState({
    title: '',
    postBody: '',
    description: '',
  });

  const { title, postBody, description } = createPostState;

  const onSubmitCreatePost = (e) => {
    e.preventDefault();
    createPost(createPostState);
    setTimeout(() => {
      setCreatePostState({
        title: '',
        postBody: '',
        description: '',
      });
      getTrendingPosts();
      getNewestPosts();
    }, 1000);
  };
  const onChange = (e) => {
    setCreatePostState({
      ...createPostState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <LeftContainer>
        {/* <ShowFormButton>Create New Post</ShowFormButton> */}
        <CreateNewPostContainer>
          <form onSubmit={onSubmitCreatePost}>
            <div>
              <label htmlFor="title">title *</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="description">description *</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="postBody">post *</label>
              <textarea
                name="postBody"
                cols="50"
                rows="3"
                value={postBody}
                onChange={onChange}
              ></textarea>
            </div>
            <div>
              <input type="submit" value="Create New Post" />
            </div>
          </form>
        </CreateNewPostContainer>
        <TrendingPosts />
      </LeftContainer>
      <RightContainer>
        <SocialLinks />
        <NewestPosts />
      </RightContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: 400px) {
    display: block;
  }
`;
const LeftContainer = styled.div`
  width: 75%;
  margin-right: 30px;
`;
const RightContainer = styled.div`
  width: 300px;
`;

const CreateNewPostContainer = styled.div``;

const ShowFormButton = styled.button``;
