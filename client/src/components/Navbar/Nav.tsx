import style from "./Nav.module.scss";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Nav = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <nav className="nav-container">
      <div className={style.navLeft}>
        <Link to="/" className={style.linkElement}>
          <h2 className={style.logo}>TownSquare</h2>
        </Link>
      </div>
      <div className={style.navCenter}>
        <div className={style.searchBar}>
          <input
            placeholder="Search for friends, people, post... everything... here"
            type="text"
            className={style.searchInput}
          />
          <Search className={style.glass} />
        </div>
      </div>
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
