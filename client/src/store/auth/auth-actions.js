import axios from 'axios';
import { authActions } from './auth-slice';

export const loadUser = () => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get('/api/v1/users/me', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      return res.data.data.user;
    };

    try {
      const user = await sendReq();
      dispatch(authActions.loadUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

//-------------------------------------------------------

export const login = (formData) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.post('/api/v1/users/login', formData);
      return res.data.token;
    };

    try {
      const token = await sendReq();

      localStorage.setItem('token', token);
      dispatch(authActions.login());
    } catch (error) {
      console.log(error);
    }
  };
};

//-------------------------------------------------------

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(authActions.logout());
  };
};

//-------------------------------------------------------

export const register = (formData) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.post('/api/v1/users/signup', formData);
      return res.data.token;
    };

    try {
      const token = await sendReq();

      localStorage.setItem('token', token);
      dispatch(authActions.register());
    } catch (error) {
      console.log(error);
    }
  };
};
