import {
  GET_NEWEST_POSTS,
  GET_POST,
  GET_POSTS,
  GET_TRENDING_POSTS,
  DELETE_POST,
  EDIT_POST,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      console.log('REDUCER', action.payload);
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
