const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
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
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
