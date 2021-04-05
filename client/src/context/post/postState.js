import React, { useReducer } from 'react';
import PostsContext from './postContext';
import PostsReducer from './postReducer';
import axios from 'axios';
import {
  GET_NEWEST_POSTS,
  GET_POST,
  GET_POSTS,
  GET_TRENDING_POSTS,
  DELETE_POST,
  EDIT_POST,
  POSTS_ERROR,
} from '../types';

const PostState = (props) => {
  const initialState = {
    currentPost: null,
    posts: null,
    trending: null,
    newest: null,
    error: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts');
      console.log(res);
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
        getPosts,
        getTrendingPosts,
        getNewestPosts,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostState;
