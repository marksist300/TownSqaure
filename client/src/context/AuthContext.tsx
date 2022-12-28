import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

type AuthState = {
  user: string | null;
  isFetching: boolean | undefined;
  error: boolean;
  dispatch?: React.Dispatch<any>;
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

export const AuthContextProvider = ({ children }: any) => {
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
