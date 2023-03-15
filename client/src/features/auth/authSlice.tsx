import { createSlice } from "@reduxjs/toolkit";

type authObj = {
  auth: {
    isLoggedIn: boolean;
    token: string;
  };
};
const userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: userToken,
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
    logoutAuth: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setSignup, setLogin, logoutAuth } = authSlice.actions;

export default authSlice.reducer;

export const authState = (state: authObj) => state.auth;
