import style from "./Signup.module.scss";
import { HTMLInputTypeAttribute, useRef } from "react";

const Signup = () => {
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordCheck = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.current?.value !== passwordCheck.current?.value) {
      return "Error message";
    } else {
      const username = `${firstName.current?.value} ${lastName.current?.value}`;
    }
  };

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
          <form className={style.signupForm} onSubmit={handleSubmit}>
            <div className={style.namesSection}>
              <input
                required
                className={style.signupInput}
                name="firstName"
                type="text"
                placeholder="First name"
                ref={firstName}
              />
              <input
                required
                className={style.signupInput}
                name="lastName"
                type="text"
                placeholder="Last name"
                ref={lastName}
              />
            </div>
            <input
              required
              className={style.signupInput}
              type="email"
              placeholder="Enter email"
              ref={email}
            />
            <input
              required
              className={style.signupInput}
              type="password"
              placeholder="Enter password"
              minLength={6}
              ref={password}
            />
            <input
              required
              className={style.signupInput}
              type="password"
              placeholder="Re-enter password"
              minLength={6}
              ref={passwordCheck}
            />
            <button className={style.submitBtn}>Signup</button>
            <span className={style.goToAccount}>Already have an account?</span>
          </form>
          {/*Output error message is passwords don't match*/}
        </div>
      </div>
    </main>
  );
};

export default Signup;
