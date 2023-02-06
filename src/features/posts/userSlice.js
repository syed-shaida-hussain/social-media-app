import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  users: [],
  currentUser: {},
  bookmarks: [],
  visitedUser: {}
};

const encodedToken = localStorage.getItem('AUTH_TOKEN');

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('/api/users');
  const data = await res.json();
  return data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (action) => {
  const userId = action._id;
  const res = await fetch(`/api/users/${userId}`);
  const data = await res.json();
  return data;
});

export const getSingleUser = createAsyncThunk('users/fetchVisitedUser', async (action) => {
  const userId = action._id;
  const res = await fetch(`/api/users/${userId}`);
  const data = await res.json();
  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    followUser: (state, action) => {
      const userId = action.payload._id;
      axios.post(
        `/api/users/follow/${userId}`,
        {},
        {
          headers: { authorization: encodedToken }
        }
      );
      const userIndex = state.users.findIndex((user) => user._id === userId);
      const currentUserIndex = state.users.findIndex(
        (user) => user.username === state.currentUser.username
      );

      state.users[userIndex].followers = [...state.users[userIndex].followers, state.currentUser];
      state.users[currentUserIndex].following = [
        ...state.users[currentUserIndex].following,
        action.payload
      ];
    },
    unfollowUser: (state, action) => {
      const userId = action.payload._id;
      axios.post(`/api/users/unfollow/${userId}`, {}, { headers: { authorization: encodedToken } });
      const userIndex = state.users.findIndex((user) => user._id === userId);
      const currentUserIndex = state.users.findIndex((user) => user._id === state.currentUser._id);
      state.users[userIndex].followers = [
        state.users[userIndex].followers.filter((user) => user._id !== state.currentUser._id)
      ];
      state.users[currentUserIndex].following = [
        state.users[currentUserIndex].following.filter((user) => user._id !== action.payload._id)
      ];
    },
    bookmarkPost: (state, action) => {
      const postId = action.payload._id;
      axios.post(`/api/users/bookmark/${postId}`, {}, { headers: { authorization: encodedToken } });
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    deleteBookmark: (state, action) => {
      const postId = action.payload._id;
      axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        { headers: { authorization: encodedToken } }
      );
      state.bookmarks = state.bookmarks.filter((bookmarkedPost) => bookmarkedPost._id !== postId);
    }
    // getSingleUser : (state,action) => {
    //   const userId = action.payload._id
    //   axios.get(`/api/users/${userId}`)
    // }
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.status = 'fulfilled';
    },
    [fetchUser.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.status = 'fulfilled';
    },
    [getSingleUser.pending]: (state) => {
      state.status = 'loading';
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.visitedUser = action.payload.user;
      state.status = 'fulfilled';
    }
  }
});

export const { followUser, unfollowUser, bookmarkPost, deleteBookmark } = userSlice.actions;

export default userSlice.reducer;
