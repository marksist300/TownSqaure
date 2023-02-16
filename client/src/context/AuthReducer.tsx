import { AuthState } from "../types";

const AuthReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case "SIGNUP_INIT":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "SIGNUP_SUCCEED":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "SIGNUP_FAIL":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGIN_INIT":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCEED":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "FOLLOW_USER":
      if (state.user?.following) {
        return {
          ...state,
          user: {
            ...state.user,
            following: [...state.user?.following, action.payload],
          },
        };
      }
    case "UNFOLLOW_USER":
      if (state.user?.following) {
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter(
              user => user !== action.payload
            ),
          },
        };
      }
    default:
      return state;
  }
};

export default AuthReducer;
