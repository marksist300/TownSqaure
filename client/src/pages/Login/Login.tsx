import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { RootState } from "../../app/store";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setLogin } from "../../features/auth/authSlice";

import style from "./Login.module.scss";
const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const dispatch = useDispatch();

  const redirectToSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/signup");
  };

  //Handle login request and set user data into state if log successful
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailVal = email.current?.value;
    const passwordVal = password.current?.value;
    try {
      const userData = await login({
        email: emailVal,
        password: passwordVal,
      }).unwrap();

      // @ts-ignore
      const { token, user } = userData;
      if (token) {
        dispatch(setLogin({ isLoggedIn: true, token }));
        dispatch(setUser({ ...user }));
      }
    } catch (error) {
      console.error(error);
    }
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
            <button
              onClick={e => redirectToSignup(e)}
              className={style.registerBtn}
              disabled={isLoading}
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
