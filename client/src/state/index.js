import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  mode: 'light', // dark
  user: null,
  token: null,
  posts: [],
};

// Create a slice of state and reducers using the `createSlice` API
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducers are functions that determine how to update the state
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // payload is the data passed in when calling the action
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error('User friends non-existent :(');
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          return action.payload.post;
        }
      });
      state.posts = updatedPost;
    },
  },
});
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
