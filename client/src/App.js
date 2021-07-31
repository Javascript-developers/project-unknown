import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import PrivateRoute from './components/routing/PrivateRoute';
import UserPage from './components/pages/UserPage';
import TagPage from './components/pages/TagPage';
import CreatePost from './components/pages/CreatePost';
import { CssBaseline } from '@material-ui/core';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Post from './components/posts/Post';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/pages/Settings';
import Dashboard from './components/pages/Dashboard';
import Search from './components/pages/Search';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Router>
        <CssBaseline />
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
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/search"
            render={(props) => <Search {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
