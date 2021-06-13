import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: true,
    error: null,
    currentUser: null,
    isAuthenticated: null,
  },
  reducers: {
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

export const authActions = authSlice.actions;
export default authSlice.reducer;
