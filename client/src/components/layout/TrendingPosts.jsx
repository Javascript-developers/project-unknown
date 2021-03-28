import React, { useEffect, useContext, Fragment } from 'react';
import Post from '../posts/Post';
import PostContext from '../../context/post/postContext';

const TrendingPosts = () => {
  const postContext = useContext(PostContext);
  const { posts, getPosts, loading } = postContext;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (posts !== null && posts.length === 0 && !loading) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <ul>
      {posts !== null && !loading ? (
        posts.map((post) => <li key={post._id}>{post.title}</li>)
      ) : (
        <div>loading...</div>
      )}
    </ul>
  );
};

export default TrendingPosts;
