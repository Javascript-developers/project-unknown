import axios from 'axios';
import { userActions } from './user-slice';

//--------------------------------------------------------

export const getUser = (id) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get(`/api/v1/users/${id}`);

      return res.data.data.user;
    };

    try {
      const user = await sendReq();

      dispatch(userActions.getUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

//--------------------------------------------------------

export const followUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/v1/users/${userId}/follow`,
        {},
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//--------------------------------------------------------

export const unfollowUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/v1/users/${userId}/unfollow`,
        {},
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//--------------------------------------------------------

export const editUserProfile = (formData) => {
  return async (dispatch) => {
    try {
      await axios.patch('api/v1/users/me', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//--------------------------------------------------------
