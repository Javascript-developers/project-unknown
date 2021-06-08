import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    currentPost: null,
    post: null,
    posts: [],
    myPosts: null,
    trending: [],
    newest: null,
    commentsFromPost: [],
    postsByTag: null,
    userPosts: [],
    liked: null,
  },
  reducers: {
    getPostsByTag(state, action) {
      state.postsByTag = action.payload;
    },

    addCurrentPost(state, action) {
      state.currentPost = action.payload;
    },

    getTrendingPosts(state, action) {
      //FIXME: needs to be handled by backend
      //FIXME: will give an error when you
      // access a post that is not on the 4 added with addPost() action bellow
      state.trending = action.payload.slice(0, 4);
    },

    createPost(state, action) {
      state.trending.push(action.payload);
    },

    addPost(state, action) {
      const id = action.payload;
      const post = state.trending.find((post) => post._id === id);

      state.post = post;
      state.commentsFromPost = post.comments.map((comment) => comment);
    },

    addComment(state, action) {
      state.commentsFromPost.push(action.payload);
    },

    removeComment(state, action) {
      state.commentsFromPost = state.commentsFromPost.filter(
        (comment) => comment.id !== action.payload
      );
    },

    myPosts(state, action) {
      state.myPosts = action.payload;
    },

    visitUser(state, action) {
      state.userPosts = action.payload;
    },

    getPosts(state, action) {
      state.posts = action.payload;
    },

    likePost(state) {
      state.liked = true;
    },

    unlikePost(state) {
      state.liked = false;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
