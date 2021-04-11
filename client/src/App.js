import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostState from './context/post/postState';
import Post from './components/posts/Post';

function App() {
  return (
    <PostState>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/post/:id" component={Post} />
          </Switch>
        </Router>
      </div>
    </PostState>
  );
}

export default App;
