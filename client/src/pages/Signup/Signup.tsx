import style from "./Signup.module.scss";

const Signup = () => {
  return (
    <main className={style.signupPage}>
      <div className={style.wrapper}>
        <div className={style.signupLeft}>
          <h2 className={style.logo}>TownSquare</h2>
          <p className={style.signupText}>
            A place to come together, connect with others & share community &
            ideas.
          </p>
        </div>
        <div className={style.signupRight}>
          <form className={style.signupForm}>
            <div className={style.namesSection}>
              <input
                className={style.signupInput}
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <input
                className={style.signupInput}
                name="lastName"
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              className={style.signupInput}
              type="email"
              placeholder="Enter email"
            />
            <input
              className={style.signupInput}
              type="text"
              placeholder="Enter password"
            />
            <input
              className={style.signupInput}
              type="text"
              placeholder="Re-enter password"
            />
            <button className={style.submitBtn}>Signup</button>
            <span className={style.goToAccount}>Already have an account?</span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
