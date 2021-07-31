import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from '../posts/PostItem';
import { bookmarkPost, unBookmarkPost } from '../../store/user/user-actions';

const PostsTab = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.searchedPosts);
  const currentUser = useSelector((state) => state.user.currentUser);

  const bookmarkOnPost = (callApi, postId) => {
    const f = callApi === 'bookmark' ? bookmarkPost : unBookmarkPost;
    dispatch(f(postId));
  };

  return (
    <div>
      {currentUser !== null && posts !== null
        ? posts.map((post, i) => (
            <PostItem
              key={i}
              post={post}
              currentUser={currentUser}
              bookmarkOnPost={bookmarkOnPost}
            />
          ))
        : 'loading...'}
    </div>
    // <div>lol</div>
  );
};

export default PostsTab;
