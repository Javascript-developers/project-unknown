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
} from '../types';

const PostState = (props) => {
  const initialState = {
    user: null,
    currentPost: null,
    posts: null,
    trending: null,
    newest: null,
    error: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const cleanUp = () => {
    try {
      dispatch({
        type: CLEAN_UP,
        payload: {
          currentPost: null,
          user: null,
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
        cleanUp,
        getUser,
        getPosts,
        getTrendingPosts,
        getNewestPosts,
        getCurrentPost,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostState;
