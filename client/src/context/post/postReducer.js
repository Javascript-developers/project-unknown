import {
  GET_NEWEST_POSTS,
  GET_CURRENT_POST,
  GET_POSTS,
  GET_TRENDING_POSTS,
  DELETE_POST,
  EDIT_POST,
  GET_USER,
  CLEAN_UP,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
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
    default:
      return state;
  }
};
