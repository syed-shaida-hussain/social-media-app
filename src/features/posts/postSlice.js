import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

const initialState = {
  status: 'idle',
  error: null,
  posts: [],
  userPosts: [],
  singlePost: {}
};

const encodedToken = localStorage.getItem('AUTH_TOKEN');
const username = localStorage.getItem('USERNAME');
const user = localStorage.getItem('USER');
const currentUser = JSON.parse(user);

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

// export const loadSinglePost = createAsyncThunk('posts/loadSinglePost', async (action) => {
//   const postId = action;
//   const res = await fetch(`/api/posts/${postId}`);
//   const data = await res.json();
//   return data;
// });

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likeButtonPressed: (state, action) => {
      const postId = action.payload._id;
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
      const postId = action.payload._id;
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
    }
    // [loadSinglePost.pending]: (state) => {
    //   state.status = 'loading';
    // },
    // [loadSinglePost.fulfilled]: (state, action) => {
    //   state.singlePost = action.payload.post;
    //   state.status = 'fulfilled';
    // }
  }
});

export const { likeButtonPressed } = postSlice.actions;
export const { dislikeButtonPressed } = postSlice.actions;
export const { addNewPost } = postSlice.actions;
export const { deletePost } = postSlice.actions;

export default postSlice.reducer;
