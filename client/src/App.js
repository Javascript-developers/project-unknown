import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import PrivateRoute from './components/routing/PrivateRoute';
import UserPage from './components/pages/UserPage';
import TagPage from './components/pages/TagPage';
import CreatePost from './components/pages/CreatePost';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Post from './components/posts/Post';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EditUserProfile from './components/pages/EditUserProfile';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/new" component={CreatePost} />
          <PrivateRoute exact path="/about" component={AboutMe} />

          <PrivateRoute exact path="/post/:id" component={Post} />

          <PrivateRoute exact path="/t/:id" component={TagPage} />
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
  );
}

export default App;
