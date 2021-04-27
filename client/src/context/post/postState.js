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
  CREATE_COMMENT,
  GET_COMMENTS_FROM_POST,
  DELETE_COMMENT,
  CREATE_POST,
  GET_MY_POSTS,
} from '../types';
import Post from '../../components/posts/Post';

const PostState = (props) => {
  const initialState = {
    user: null,
    currentPost: null,
    posts: null,
    myPosts: null,
    trending: null,
    newest: null,
    error: null,
    currentPostLiked: null,
    commentsFromPost: null,
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

  const createPost = async (formData) => {
    try {
      await axios.post('/api/v1/posts', formData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      dispatch({
        type: CREATE_POST,
      });
    } catch (err) {
      console.log(err);
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

  const getMyPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts/myPosts', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      console.log('GETMYPOSTS', res);
      dispatch({
        type: GET_MY_POSTS,
        payload: res.data.data.posts,
      });
    } catch (err) {
      console.log(err);
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
      await axios.patch(`/api/v1/posts/${postId}/like`, null, {
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
      await axios.patch(`/api/v1/posts/${postId}/unlike`, null, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      dispatch({
        type: UNLIKE_POST,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/v1/posts/${postId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      dispatch({
        type: DELETE_POST,
      });
    } catch (err) {
      alert("You cannot delete another user's post");
      console.log(err);
    }
  };

  const createCommentOnPost = async (postId, commentData) => {
    try {
      await axios.post(`/api/v1/posts/${postId}/comments`, commentData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      dispatch({
        type: CREATE_COMMENT,
        // payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentsFromPost = async (postId) => {
    try {
      const res = await axios.get(`/api/v1/posts/${postId}/comments`);
      dispatch({
        type: GET_COMMENTS_FROM_POST,
        payload: res.data.data.comments,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommentOnPost = async (postId, commentId) => {
    try {
      await axios.delete(`/api/v1/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      dispatch({
        type: DELETE_COMMENT,
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
        myPosts: state.myPosts,
        trending: state.trending,
        newest: state.newest,
        error: state.error,
        loading: state.loading,
        user: state.user,
        currentPostLiked: state.currentPostLiked,
        commentsFromPost: state.commentsFromPost,
        cleanUp,
        getUser,
        getPosts,
        getTrendingPosts,
        getNewestPosts,
        getCurrentPost,
        likePost,
        unlikePost,
        deletePost,
        createCommentOnPost,
        getCommentsFromPost,
        deleteCommentOnPost,
        createPost,
        getMyPosts,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostState;
