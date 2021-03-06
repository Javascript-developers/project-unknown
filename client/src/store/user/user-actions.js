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

export const getUserByUsername = (username) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get(`/api/v1/users/username/${username}`);

      return res.data.data.user[0];
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
      dispatch(userActions.followUser(userId));
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
      dispatch(userActions.unFollowUser(userId));

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

export const bookmarkPost = (id) => {
  return async (dispatch) => {
    const sendReq = async () => {
      dispatch(userActions.bookmarkPost(id));
      const res = await axios.patch(
        `/api/v1/users/bookmark`,
        { postId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return res;
    };
    try {
      await sendReq();
    } catch (error) {
      console.log(error);
    }
  };
};

export const unBookmarkPost = (id) => {
  return async (dispatch) => {
    const sendReq = async () => {
      dispatch(userActions.unBookmarkPost(id));
      const res = await axios.patch(
        `/api/v1/users/unBookmark`,
        { postId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return res;
    };
    try {
      await sendReq();
    } catch (error) {
      console.log(error);
    }
  };
};

//-------------------------------------------------------

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
      dispatch(userActions.loadUser(user));
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
      dispatch(userActions.login());
    } catch (error) {
      console.log(error);
    }
  };
};

//-------------------------------------------------------

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(userActions.logout());
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
      dispatch(userActions.register());
    } catch (error) {
      console.log(error);
    }
  };
};

//-------------------------------------------------------

export const getFollowers = () => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get('/api/v1/users/getFollowers', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      return res.data.data.followers;
    };

    try {
      const followers = await sendReq();

      dispatch(userActions.addFollowers(followers));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFollowing = () => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get('/api/v1/users/getFollowing', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      return res.data.data.following;
    };

    try {
      const following = await sendReq();

      dispatch(userActions.addFollowingUsers(following));
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchUsers = (query) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get(`/api/v1/users/search?q=${query}`);

      return res.data.data.users;
    };
    try {
      const users = await sendReq();
      dispatch(userActions.addSearchUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};
