import {
  GET_NEWEST_POSTS,
  GET_CURRENT_POST,
  GET_POSTS,
  GET_TRENDING_POSTS,
  DELETE_POST,
  EDIT_POST,
  GET_USER,
  CLEAN_UP,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_COMMENT,
  GET_COMMENTS_FROM_POST,
  DELETE_COMMENT,
  CREATE_POST,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
        loading: false,
      };
    case GET_TRENDING_POSTS:
      return {
        ...state,
        trending: action.payload.slice(0, 4),
        loading: false,
      };
    case GET_NEWEST_POSTS:
      return {
        ...state,
        newest: action.payload.slice(0, 4),
        loading: false,
      };
    case CLEAN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case LIKE_POST:
      return {
        ...state,
        currentPostLiked: true,
      };
    case UNLIKE_POST:
      return {
        ...state,
        currentPostLiked: false,
      };
    case DELETE_POST:
      return {
        ...state,
      };
    case CREATE_COMMENT:
      return {
        ...state,
      };
    case GET_COMMENTS_FROM_POST:
      return {
        ...state,
        commentsFromPost: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
