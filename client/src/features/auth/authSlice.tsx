import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    //Example from docs
    setSignup: (state, action) => {
      const { isLoggedIn, token } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.token = token;
    },
    setLogin: (state, action) => {
      const { isLoggedIn, token } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.token = token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setSignup, setLogin, logout } = authSlice.actions;

export default authSlice.reducer;

export const authState = (state: {
  auth: {
    isLoggedIn: boolean;
    token: string;
  };
}) => state;
