import React, { useReducer, useState } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_ERROR,
  USER_LOADED,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    loading: true,
    token: null,
    error: null,
    currentUser: null,
    isAuthenticated: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  // const [data, setData] = useState([]);

  // const loadUser = async () => {
  //   try {
  //     if (cache['/api/v1/users/me']) {
  //       const res = cache['/api/v1/users/me'];
  //       setData(res);
  //       console.log('MEMOIZED');
  //     } else {
  //       const res = await axios.get('/api/v1/users/me', {
  //         headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('token'),
  //         },
  //       });
  //       cache['/api/v1/users/me'] = res;
  //       setData(res);
  //       console.log('NOT MEMOIZED');
  //     }
  //     console.log('MEMOIZING', cache);

  //     dispatch({
  //       type: USER_LOADED,
  //       payload: data.data.data.user,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/v1/users/me', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      dispatch({
        type: USER_LOADED,
        payload: res.data.data.user,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/v1/users/login', formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res,
      });
      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async (formData) => {
    try {
      const res = await axios.post('/api/v1/users/signup', formData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res,
      });
      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () =>
    dispatch({
      type: LOGOUT,
    });

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        token: state.token,
        error: state.error,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        login,
        loadUser,
        registerUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
