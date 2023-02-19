import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import signupReducer from "../features/signup/signupSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    post: postReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
