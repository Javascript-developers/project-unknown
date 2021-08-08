import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import postReducer from './post/post-slice';
import uiReducer from './UI/ui-slice';
import userReducer from './user/user-slice';
import messengerReducer from './messenger/messenger-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    ui: uiReducer,
    user: userReducer,
    messenger: messengerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
