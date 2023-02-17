import style from "./Login.module.scss";
import React, { useContext, useRef } from "react";
import { loginAPICall } from "../../helpers/apiCalls";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailVal = email.current?.value;
    const passwordVal = password.current?.value;
    const data = await loginAPICall(
      JSON.stringify({ email: emailVal, password: passwordVal }),
      dispatch
    );
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
            <button className={style.submitBtn} disabled={isFetching}>
              {isFetching ? "Logging in..." : "Log in"}
            </button>
            <span className={style.forgottenPassword}>
              Forgotten Your Password?
            </span>
            <button className={style.registerBtn} disabled={isFetching}>
              Create an account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
