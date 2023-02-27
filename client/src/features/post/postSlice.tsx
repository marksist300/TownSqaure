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
    newPostToState: (state, action) => {
      state.push(action.payload);
    },
    deletePostFromState: (state, action) => {
      return state.filter(post => post._id !== action.payload);
    },
  },
});

export const { getAllPosts, newPostToState, deletePostFromState } =
  postsSlice.actions;

export default postsSlice.reducer;

export const posts = (state: PostType[]) => state;
