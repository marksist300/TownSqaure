export const LoginInit = (userCredentials: boolean) => ({
  type: "LOGIN_INIT",
});
export const LoginSucceed = (user: string) => ({
  type: "LOGIN_SUCCEED",
  payload: user,
});
export const LoginFail = () => ({
  type: "LOGIN_FAIL",
});
