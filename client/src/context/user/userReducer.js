import { EDIT_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case EDIT_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
