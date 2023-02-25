import { createSlice } from "@reduxjs/toolkit";
import { PostProps } from "../../types";
type DataObj = {
  followed: PostProps[];
};

const INITIAL_STATE: DataObj = { followed: [] };

export const followedSlice = createSlice({
  name: "followingData",
  initialState: INITIAL_STATE,
  reducers: {
    setFollowedUsers: (state, action) => {
      return action.payload;
    },
    updateFollowedUsers: (state, action: { payload: PostProps }) => {
      state.followed.push(action.payload);
    },
  },
});

export const { setFollowedUsers, updateFollowedUsers } = followedSlice.actions;

export default followedSlice.reducer;

export const posts = (state: DataObj) => state;
