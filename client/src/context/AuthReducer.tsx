import { PlaylistAddOutlined } from "@mui/icons-material";
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
    default:
      return state;
  }
};

export default AuthReducer;
