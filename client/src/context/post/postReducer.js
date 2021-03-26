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
    case GET_POST:
      return {
        ...state,
      };

    default:
      return state;
  }
};
