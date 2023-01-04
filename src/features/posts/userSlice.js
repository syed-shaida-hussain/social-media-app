import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  users: [],
  currentUser: {}
};

const encodedToken = localStorage.getItem('AUTH_TOKEN');
const user = localStorage.getItem('USER');
const currentUser = JSON.parse(user);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('/api/users');
  const data = await res.json();
  return data;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    // const res = await fetch(`/api/users/${currentUser._id}`);
    // const data = await res.json();
    // return data;
  } catch (e) {
    console.log(e);
  }
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
        (user) => user.username === currentUser.username
      );

      state.users[userIndex].followers = [...state.users[userIndex].followers, currentUser];
      state.users[currentUserIndex].following = [
        ...state.users[currentUserIndex].following,
        action.payload
      ];
    },
    unfollowUser: (state, action) => {
      const userId = action.payload._id;
      axios.post(`/api/users/unfollow/${userId}`, {}, { headers: { authorization: encodedToken } });
      const userIndex = state.users.findIndex((user) => user._id === userId);
      const currentUserIndex = state.users.findIndex(
        (user) => user.username === currentUser.username
      );
      state.users[userIndex].followers = [
        state.users[userIndex].followers.filter((user) => user._id !== currentUser._id)
      ];
      state.users[currentUserIndex].following = [
        state.users[currentUserIndex].following.filter((user) => user._id !== action.payload._id)
      ];
    }
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
    [fetchUser.fulfilled]: (state) => {
      state.currentUser = currentUser;
      state.status = 'fulfilled';
    }
  }
});

export const { followUser, unfollowUser } = userSlice.actions;

export default userSlice.reducer;
