import style from "./Login.module.scss";
import React, { useRef, useEffect } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setLogin } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { RootState } from "../../app/store";
const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state);

  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const dispatch = useDispatch();

  // check if user token already exists
  useEffect(() => {
    if (user?.auth) {
      const { isLoggedIn, token } = user.auth;
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        dispatch(setLogin({ isLoggedIn: true, token: currentToken }));
      } else if (!currentToken && token) {
        localStorage.setItem("token", JSON.stringify(token));
        console.log("setting token");
      }
    }
    console.log("running login useEffect");
  }, [user?.auth]);

  //Handle login request and set user data into state if log successful
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailVal = email.current?.value;
    const passwordVal = password.current?.value;
    try {
      const userData = await login({ email: emailVal, password: passwordVal });

      // @ts-ignore
      const { token, user } = userData.data;
      console.log(user);
      if (token) {
        dispatch(setLogin({ isLoggedIn: true, token }));
        dispatch(setUser({ ...user }));
      }
    } catch (error) {}
  };

  return (
    <main className={style.loginPage}>
      <div className={style.wrapper}>
        <div className={style.loginLeft}>
          <h2 className={style.logo}>TownSquare</h2>
          <p className={style.loginText}>
            A place to come together, connect with others & share community &
            ideas.
          </p>
        </div>
        <div className={style.loginRight}>
          <form className={style.loginForm} onSubmit={handleSubmit}>
            <input
              required
              className={style.loginInput}
              type="email"
              placeholder="Enter email here..."
              ref={email}
            />
            <input
              required
              className={style.loginInput}
              type="password"
              placeholder="Enter password here..."
              minLength={6}
              ref={password}
            />
            <button className={style.submitBtn} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>
            <span className={style.forgottenPassword}>
              Forgotten Your Password?
            </span>
            <button className={style.registerBtn} disabled={isLoading}>
              Create an account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
