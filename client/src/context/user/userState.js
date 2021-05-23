import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios';

import { EDIT_USER } from '../types';

const UserState = (props) => {
  const initialState = {
    loading: true,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const editUserProfile = async (formData) => {
    try {
      await axios.patch('api/v1/users/me', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch({
        type: EDIT_USER,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        editedUser: state.editedUser,
        loading: state.loading,
        editUserProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
