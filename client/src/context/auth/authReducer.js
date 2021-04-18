import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_ERROR,
  USER_LOADED,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currentUser: action.payload,
      };
    // case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        token: null,
      };
    default:
      return state;
  }
};
