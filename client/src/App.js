import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import PrivateRoute from './components/routing/PrivateRoute';
import UserPage from './components/pages/UserPage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PostState from './context/post/postState';
import AuthState from './context/auth/authState';
import UserState from './context/user/userState';

import Post from './components/posts/Post';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EditUserProfile from './components/pages/EditUserProfile';

function App() {
  return (
    <UserState>
      <AuthState>
        <PostState>
          <div className="App">
            <Router>
              <Navbar />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/about" component={AboutMe} />
                <PrivateRoute exact path="/post/:id" component={Post} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/user/:id" component={UserPage} />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditUserProfile}
                />
              </Switch>
            </Router>
          </div>
        </PostState>
      </AuthState>
    </UserState>
  );
}

export default App;
