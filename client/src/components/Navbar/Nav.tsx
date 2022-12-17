import style from "./Nav.module.scss";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import user from "../../assets/profile/pic8.jpg";
const Nav = () => {
  return (
    <nav className="nav-container">
      <div className={style.navLeft}>
        <span className={style.logo}>TownSquare</span>
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
        <img src={user} alt="" className={style.userImg} />
      </div>
    </nav>
  );
};

export default Nav;
