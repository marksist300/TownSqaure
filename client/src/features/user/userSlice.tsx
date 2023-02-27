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
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      state._id = user._id ? user._id : state._id;
      state.cover = user.cover ? user.cover : state.cover;
      state.profilePic = user.profilePic ? user.profilePic : state.profilePic;
      state.username = user.username ? user.username : state.username;
      state.description = user.description
        ? user.description
        : state.description;
      state.location = user.location ? user.location : state.location;
      state.hometown = user.hometown ? user.hometown : state.hometown;
      state.email = user.email ? user.email : state.email;
      state.following = user.following
        ? user.following.push(action.payload)
        : state.following;
      state.followers = user.followers
        ? user.followers.push(action.payload)
        : state.followers;
      state.relationship = user.relationship
        ? user.relationship
        : state.relationship;
    },
    setUnfollowUser: (state, action) => {
      state.following = state.following.filter(elem => elem !== action.payload);
    },
    setFollowUser: (state, action: { payload: string }) => {
      state.following.push(action.payload);
    },
  },
});

export const { setUser, updateUser, setUnfollowUser, setFollowUser } =
  userSlice.actions;

export default userSlice.reducer;

export const currentUser = (state: DataObj) => state.user;
