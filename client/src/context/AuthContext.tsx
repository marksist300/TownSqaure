import { createContext, ReactNode, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

interface User {
  cover: string;
  email: string;
  followers: string[];
  following: string[];
  isAdmin: boolean;
  password: string;
  profilePic: string;
  username: string;
  _id: string;
}

type AuthState = {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  dispatch?: React.Dispatch<object>;
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
