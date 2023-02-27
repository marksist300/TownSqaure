import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "../../types";

const INITIAL_STATE: PostType[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    getAllPosts: (state, action) => {
      return action.payload;
    },
    createPostWithImg: (state, action) => {
      state.push(action.payload);
    },
    createPostNoImg: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { getAllPosts, createPostWithImg, createPostNoImg } =
  postsSlice.actions;

export default postsSlice.reducer;

export const posts = (state: PostType[]) => state;
