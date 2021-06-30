import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    currentPostBookmarked: null,
    // loading: true,
    error: null,
    currentUser: null,
    isAuthenticated: null,
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
      console.log('BOOKMARK REDUCER', action.payload);
      state.currentPostBookmarked = true;
      state.currentUser.bookmarkedPosts.push(action.payload);
    },
    unBookmarkPost(state, action) {
      console.log('UN-BOOKMARK REDUCER', action.payload);
      state.currentPostBookmarked = false;
      const index = state.currentUser.bookmarkedPosts.indexOf(action.payload);
      if (index > -1) {
        state.currentUser.bookmarkedPosts.splice(index, 1);
      }
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
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
