import { createContext, ReactNode, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

type AuthState = {
  user: object | null;
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
