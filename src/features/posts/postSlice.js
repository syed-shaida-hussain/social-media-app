import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  posts: [],
  userPosts: [],
  singlePost: {},
  visitedUserPosts: []
};

const encodedToken = localStorage.getItem('AUTH_TOKEN');
const username = localStorage.getItem('USERNAME');

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
  const res = await fetch('/api/posts');
  const data = await res.json();
  return data;
});

export const loadUserPosts = createAsyncThunk('posts/loadUserPosts', async () => {
  const res = await fetch(`/api/posts/user/${username}`);
  const data = await res.json();
  return data;
});

export const loadVisitedUserPosts = createAsyncThunk(
  'posts/loadVisitedUserPosts',
  async (action) => {
    const username = action.username;
    const res = await fetch(`/api/posts/user/${username}`);
    const data = await res.json();
    return data;
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likeButtonPressed: (state, action) => {
      const postId = action.payload.post._id;
      const currentUser = action.payload.user;
      axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: { authorization: encodedToken }
        }
      );
      const postIndex = state.posts.findIndex((post) => post._id === postId);
      state.posts[postIndex].likes.likeCount += 1;
      state.posts[postIndex].likes.likedBy = [...state.posts[postIndex].likes.likedBy, currentUser];
    },
    dislikeButtonPressed: (state, action) => {
      const postId = action.payload.post._id;
      const currentUser = action.payload.user;
      axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: { authorization: encodedToken }
        }
      );
      const postIndex = state.posts.findIndex((post) => post._id === postId);
      state.posts[postIndex].likes.likeCount -= 1;
      state.posts[postIndex].likes.likedBy = [
        state.posts[postIndex].likes.likedBy.filter((user) => user._id !== currentUser._id)
      ];
    },
    addNewPost: (state, action) => {
      axios.post('/api/posts', action.payload, {
        headers: { authorization: encodedToken }
      });
      state.posts = [...state.posts, action.payload];
      state.userPosts = [...state.userPosts, action.payload];
      // axios
      //   .get('/api/users/bookmark', { headers: { authorization: encodedToken } })
      //   .then((res) => console.log(res));
    },
    deletePost: (state, action) => {
      const postId = action.payload._id;
      axios.delete(`/api/posts/${postId}`, { headers: { authorization: encodedToken } });
      state.posts = state.posts.filter((post) => post._id !== postId);
      state.userPosts = state.userPosts.filter((post) => post._id !== postId);
    }
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = 'fulfilled';
    },
    [loadUserPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [loadUserPosts.fulfilled]: (state, action) => {
      state.userPosts = action.payload.posts;
      state.status = 'fulfilled';
    },
    [loadVisitedUserPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [loadVisitedUserPosts.fulfilled]: (state, action) => {
      state.visitedUserPosts = action.payload.posts;
      state.status = 'fulfilled';
    }
  }
});

export const { likeButtonPressed, dislikeButtonPressed, addNewPost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
