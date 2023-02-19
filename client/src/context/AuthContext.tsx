import { createContext, ReactNode, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { AuthState } from "../types";

const INITIAL_STATE = {
  user: null,
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
