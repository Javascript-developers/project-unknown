import { EDIT_USER, FOLLOW_USER, UNFOLLOW_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case EDIT_USER:
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
