import React, { useReducer } from 'react';
import PostsContext from './postContext';
import PostsReducer from './postReducer';
import axios from 'axios';
import {
  GET_NEWEST_POSTS,
  GET_CURRENT_POST,
  GET_POSTS,
  GET_TRENDING_POSTS,
  DELETE_POST,
  EDIT_POST,
  POSTS_ERROR,
  GET_USER,
  CLEAN_UP,
  LIKE_POST,
  UNLIKE_POST,
} from '../types';

const PostState = (props) => {
  const initialState = {
    user: null,
    currentPost: null,
    posts: null,
    trending: null,
    newest: null,
    error: null,
    currentPostLiked: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const cleanUp = () => {
    try {
      dispatch({
        type: CLEAN_UP,
        payload: {
          currentPostLiked: null,
        },
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/v1/users/${id}`);
      dispatch({
        type: GET_USER,
        payload: res.data.data.user,
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts');
      dispatch({
        type: GET_POSTS,
        payload: res.data.data.posts,
      });
      console.log(state.posts);
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  const getCurrentPost = async (id) => {
    try {
      const res = await axios.get(`/api/v1/posts/${id}`);
      dispatch({
        type: GET_CURRENT_POST,
        payload: res.data.data.post,
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  const getTrendingPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts');
      dispatch({
        type: GET_TRENDING_POSTS,
        payload: res.data.data.posts,
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  const getNewestPosts = async () => {
    const res = await axios.get('/api/v1/posts');
    try {
      dispatch({
        type: GET_NEWEST_POSTS,
        payload: res.data.data.posts,
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err,
      });
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await axios.patch(`/api/v1/posts/${postId}/like`, null, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      dispatch({
        type: LIKE_POST,
        // payload: res.data.data.post.likes,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const unlikePost = async (postId) => {
    try {
      const res = await axios.patch(`/api/v1/posts/${postId}/unlike`, null, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      dispatch({
        type: UNLIKE_POST,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        currentPost: state.currentPost,
        posts: state.posts,
        trending: state.trending,
        newest: state.newest,
        error: state.error,
        loading: state.loading,
        user: state.user,
        currentPostLiked: state.currentPostLiked,
        cleanUp,
        getUser,
        getPosts,
        getTrendingPosts,
        getNewestPosts,
        getCurrentPost,
        likePost,
        unlikePost,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostState;
