import style from "./Login.module.scss";

const Login = () => {
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
          <form className={style.loginForm}>
            <input
              className={style.loginInput}
              type="email"
              placeholder="Enter email here..."
            />
            <input
              className={style.loginInput}
              type="text"
              placeholder="Enter password here..."
            />
            <button className={style.submitBtn}>Log in</button>
            <span className={style.forgottenPassword}>
              Forgotten Your Password?
            </span>
            <button className={style.registerBtn}>Create an account</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
