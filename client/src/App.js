import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PostState from './context/post/postState';
import AuthState from './context/auth/authState';

import Post from './components/posts/Post';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <AuthState>
      <PostState>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Router>
        </div>
      </PostState>
    </AuthState>
  );
}

export default App;
