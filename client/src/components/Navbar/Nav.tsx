import style from "./Nav.module.scss";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import user from "../../assets/profile/pic8.jpg";
const Nav = () => {
  return (
    <nav className="nav-container">
      <div className={style.navLeft}>
        <span className={style.logo}>TownSquare</span>
      </div>
      <div className="nav-center">
        <div className={style.searchBar}>
          <Search className={style.glass} />
          <input
            placeholder="Search for friends, people, post... everything... here"
            type="text"
            className={style.searchInput}
          />
        </div>
      </div>
      <div className={style.navRight}>
        <ul className="nav-links">
          <li className="nav-link">Homepage</li>
          <li className="nav-link">TimeLine</li>
        </ul>
        <div className="nav-icon">
          <Person />
          <span className="nav-icon-badge">1</span>
        </div>
        <div className="nav-icon">
          <Chat />
          <span className="nav-icon-badge">2</span>
        </div>
        <div className="nav-icon">
          <Notifications />
          <span className="nav-icon-badge">3</span>
        </div>
        <img src={user} alt="" className={style.userImg} />
      </div>
    </nav>
  );
};

export default Nav;
