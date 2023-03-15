import { createSlice } from "@reduxjs/toolkit";
import { INIT_USER_STATE } from "../../types";
type DataObj = {
  user: {
    cover: string;
    profilePic: string | null;
    username: string | null;
    description: string | null;
    location: string | null;
    hometown: string | null;
    email: string | null;
    following: string[];
    followers: string[];
    relationship: number | null;
    _id: string | null;
  };
};

const INITIAL_STATE: INIT_USER_STATE = {
  cover: "",
  profilePic: "",
  username: "",
  description: "",
  location: "",
  hometown: "",
  email: "",
  following: [],
  followers: [],
  relationship: null,
  _id: "",
  profilePicId: "",
  coverId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    updateUserProfileImgs: (state, action) => {
      const { user, cover, coverId, profilePic, profilePicId, following } =
        action.payload;
      //remove destructuring to improve this && make work with modal image upload
      state.cover = cover ? (state.cover = cover) : state.cover;
      state.profilePic = profilePic
        ? (state.profilePic = profilePic)
        : state.profilePic;
      state.profilePicId = profilePicId
        ? (state.profilePicId = profilePicId)
        : state.profilePicId;
      state.coverId = coverId ? (state.coverId = coverId) : state.coverId;
    },
    updateUserData: (state, action) => {
      const { username, location, hometown, relationship } = action.payload;
      state.username = username ? username : state.username;
      state.location = location ? location : state.location;
      state.hometown = hometown ? hometown : state.hometown;
      state.relationship = relationship ? relationship : state.relationship;
    },
    setUnfollowUser: (state, action) => {
      state.following = state.following.filter(elem => elem !== action.payload);
    },
    setFollowUser: (state, action: { payload: string }) => {
      state.following.push(action.payload);
    },
    logoutUser: state => {
      state.cover = "";
      state.profilePic = "";
      state.username = "";
      state.description = "";
      state.location = "";
      state.hometown = "";
      state.email = "";
      state.following = [];
      state.followers = [];
      state.relationship = null;
      state._id = "";
      state.profilePicId = "";
      state.coverId = "";
    },
  },
});

export const {
  setUser,
  updateUserProfileImgs,
  setUnfollowUser,
  setFollowUser,
  updateUserData,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;

export const currentUser = (state: DataObj) => state.user;
