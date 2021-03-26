import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Post from '../posts/Post';
import PostContext from '../../context/post/postContext';

const TrendingPosts = () => {
  const postContext = useContext(PostContext);
  const { getPost } = postContext;
  useEffect(() => {
    getPost();
  }, []);
  return <div></div>;
};

export default TrendingPosts;
