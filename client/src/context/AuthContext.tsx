import { createContext, ReactNode, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { AuthState } from "../types";

const dummyUser = {
  _id: "63a5d21a31ac7abaf5e68a1d",
  username: "Aaron Delta",
  email: "aaron@email.com",
  isAdmin: false,
  profilePic:
    "https://res.cloudinary.com/djucwl5l6/image/upload/v1671811130/pic8_akoaf5.jpg",
  cover:
    "https://res.cloudinary.com/djucwl5l6/image/upload/v1671811122/winter_qm3f32.png",
  following: [
    "63a5d106d7527e6b48d1b81f",
    "63a5d26e31ac7abaf5e68a20",
    "63a5d2dd31ac7abaf5e68a23",
    "63a5d32731ac7abaf5e68a26",
    "63a5d37831ac7abaf5e68a29",
    "63a5d3c131ac7abaf5e68a2c",
    "63a5d3f631ac7abaf5e68a2f",
  ],
};

const INITIAL_STATE = {
  user: dummyUser,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state?.user,
        isFetching: state?.isFetching,
        error: state?.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
