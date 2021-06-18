import axios from 'axios';
import { tagActions } from './tag-slice';

//-----------------------------------------------------------
export const followTag = (tag) => {
  //tag should be a string
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.patch(
        '/api/v1/users/followTag',
        { tag },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );

      if (!res) {
        throw new Error('Could not follow Tag');
      }

      return res;
    };

    try {
      await sendReq();
    } catch (error) {
      console.log(error);
    }
  };
};

export const unfollowTag = (tag) => {
  //tag should be a string
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.patch(
        '/api/v1/users/unfollowTag',
        { tag },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );

      if (!res) {
        throw new Error('Could not unfollow Tag');
      }

      return res;
    };

    try {
      await sendReq();
    } catch (error) {
      console.log(error);
    }
  };
};
