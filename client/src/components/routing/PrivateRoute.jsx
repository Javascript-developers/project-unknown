import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../store/auth/auth-actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log('LOAD USER');
    if (localStorage.token) {
      dispatch(loadUser());
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...rest} />
      }
    />
  );
};

export default PrivateRoute;
