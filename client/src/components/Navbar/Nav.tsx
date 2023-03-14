import style from "./Nav.module.scss";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Nav = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigateSearch = useNavigate();
  const searchRef = useRef<any>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current !== null) {
      navigateSearch(`/search?person=${searchRef.current.value}`);
    }
    searchRef.current.value = "";
  };

  return (
    <nav className="nav-container">
      <div className={style.navLeft}>
        <Link to="/" className={style.linkElement}>
          <h2 className={style.logo}>TownSquare</h2>
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
        <ul className={style.navLinks}>
          <li className="nav-link">Homepage</li>
          <li className="nav-link">TimeLine</li>
        </ul>
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
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePic ? user.profilePic : `/assets/profile/default.png`
            }
            alt=""
            className={style.userImg}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
