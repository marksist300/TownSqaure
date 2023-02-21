import style from "./Login.module.scss";
import React, { useRef, useEffect } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setLogin } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../../features/user/userSlice";

const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const user = useSelector(state => state);

  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.auth) {
      const { isLoggedIn, token } = user.auth;
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        console.log("token currenlty saved: ", currentToken);
      } else if (!currentToken && token) {
        localStorage.setItem("token", JSON.stringify(token));
      }
    }
    console.log(user);
  }, [user?.auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailVal = email.current?.value;
    const passwordVal = password.current?.value;
    try {
      const userData = await login({ email: emailVal, password: passwordVal });
      const { token, user } = userData.data;
      if (token) {
        dispatch(setLogin({ isLoggedIn: true, token }));
        dispatch(setUser({ user }));
      }
      if (data) {
        console.log("User data is: ", data);
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
