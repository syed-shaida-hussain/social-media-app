import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/posts/userSlice';
export const store = configureStore({
  reducer: { timeline: postReducer, auth: userReducer }
});
