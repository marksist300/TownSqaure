import style from "./Sidebar.module.scss";
import { usersData as Users } from "../../dummyData";
import FriendsSide from "../FriendsSide/FriendsSide";
import {
  RssFeed,
  Chat,
  PlayCircle,
  Event,
  School,
  Group,
  Storefront,
  Star,
  Bookmark,
} from "@mui/icons-material";
const Sidebar = () => {
  const users = Users.map(user => (
    <FriendsSide key={`KeY1${user.id}`} user={user} />
  ));
  return (
    <section className={style.sidebarContainer}>
      <div className={style.wrapper}>
        <ul className={style.list}>
          <li className={style.listItem}>
            <RssFeed />
            <span className={style.listItemText}>Feed</span>
          </li>
          <li className={style.listItem}>
            <Chat />
            <span className={style.listItemText}>Chat</span>
          </li>
          <li className={style.listItem}>
            <Group />
            <span className={style.listItemText}>Groups</span>
          </li>
          <li className={style.listItem}>
            <Event />
            <span className={style.listItemText}>Events</span>
          </li>
          <li className={style.listItem}>
            <School />
            <span className={style.listItemText}>Study</span>
          </li>
          <li className={style.listItem}>
            <PlayCircle />
            <span className={style.listItemText}>Videos</span>
          </li>
          <li className={style.listItem}>
            <Storefront />
            <span className={style.listItemText}>MarketPlace</span>
          </li>
          <li className={style.listItem}>
            <Star />
            <span className={style.listItemText}>Favourites</span>
          </li>
          <li className={style.listItem}>
            <Bookmark />
            <span className={style.listItemText}>Bookmarks</span>
          </li>
        </ul>
        <button className={style.showMoreBtn}>Show More</button>
        {/* break line for friend section */}
        <hr />
        {users}
      </div>
    </section>
  );
};

export default Sidebar;
