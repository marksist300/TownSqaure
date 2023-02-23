import { createSlice } from "@reduxjs/toolkit";
import { PostProps } from "../../types";
type DataObj = {
  posts: PostProps[];
};

const INITIAL_STATE: DataObj = { posts: [] };

// PUT POSTS INTO STATE
// TODO: Set up RTK Query for posts
export const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    getAllPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    createPostWithImg: (state, action) => {
      state.posts.push(action.payload);
    },
    createPostNoImg: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { createPostWithImg, createPostNoImg } = postsSlice.actions;

export default postsSlice.reducer;

export const posts = (state: DataObj) => state.posts;
