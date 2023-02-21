import { createSlice } from "@reduxjs/toolkit";

type DataObj = {
  data: {
    user: {};
  };
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    //Example from docs
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

export const currentUser = (state: DataObj) => state.data;
