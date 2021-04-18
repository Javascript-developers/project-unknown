import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    console.log('LOAD USER');
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
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
