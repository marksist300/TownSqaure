import style from "./Nav.module.scss";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NavDropDown from "./NavDropdown";
const Nav = () => {
  //TODO => make the nav responsive, on smaller screens a A full slide menu when usermenu opened
  const user = useSelector((state: RootState) => state.user);
  const userIsLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const navigateSearch = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current !== null) {
      navigateSearch(`/search?person=${searchRef.current.value}`);
    }
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  return (
    <nav className="nav-container">
      <div className={style.navLeft}>
        <Link to="/" className={style.linkElement}>
          <h2 className={style.logo}>TS</h2>
        </Link>
      </div>
      <form className={style.navCenter} onSubmit={handleSubmit}>
        <div className={style.searchBar}>
          <input
            placeholder="Search for friends, people, post... everything... here"
            type="text"
            className={style.searchInput}
            ref={searchRef}
          />
          <Search className={style.glass} />
        </div>
      </form>
      <div className={style.navRight}>
        {user._id && userIsLoggedIn ? (
          <>
            <div className={style.navIconCollection}>
              <Link to="/" className={style.navLinkHome}>
                Homepage
              </Link>
              <div className={style.navIconMsgBtns}>
                <div className={style.navIcons}>
                  <Person />
                  <span className={style.navIconBadge}>1</span>
                </div>
                <div className={style.navIcons}>
                  <Chat />
                  <span className={style.navIconBadge}>2</span>
                </div>
                <div className={style.navIcons}>
                  <Notifications />
                  <span className={style.navIconBadge}>3</span>
                </div>
              </div>
              <div className={style.profileMenuImg}>
                <NavDropDown />
              </div>
            </div>
          </>
        ) : (
          <ul className={style.signupLinks}>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </ul>
        )}
        {/* {user._id && userIsLoggedIn && <NavDropDown />} */}
      </div>
    </nav>
  );
};

export default Nav;
