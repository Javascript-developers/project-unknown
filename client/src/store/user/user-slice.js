import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    currentPostBookmarked: null,
    currentPostUserFollowing: null,
    // loading: true,
    error: null,
    currentUser: null,
    isAuthenticated: null,
    followers: [],
    following: [],
  },
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },

    checkBookmark(state, action) {
      const bookmarked =
        action.payload.bookmarks.indexOf(action.payload.postId) !== -1;
      state.currentPostBookmarked = bookmarked;
    },

    bookmarkPost(state, action) {
      state.currentPostBookmarked = true;
      state.currentUser.bookmarkedPosts.push(action.payload);
    },
    unBookmarkPost(state, action) {
      state.currentPostBookmarked = false;
      const index = state.currentUser.bookmarkedPosts.indexOf(action.payload);
      if (index > -1) {
        state.currentUser.bookmarkedPosts.splice(index, 1);
      }
    },

    checkFollowing(state, action) {
      const followed =
        action.payload.followers.indexOf(action.payload.me) !== -1;
      state.currentPostUserFollowing = followed;
    },
    followUser(state, action) {
      state.currentPostUserFollowing = true;
    },
    unFollowUser(state, action) {
      state.currentPostUserFollowing = false;
    },

    loadUser(state, action) {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.loading = false;
    },

    login(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.loading = true;
    },

    register(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },

    addFollowers(state, action) {
      state.followers = action.payload;
    },

    addFollowingUsers(state, action) {
      state.following = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
