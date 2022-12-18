import style from "./Sidebar.module.scss";
import friendPic from "../../assets/profile/pic1.jpg";
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
        <ul className={style.friendList}>
          <li className={style.friendLink}>
            <img
              className={style.friendLinkImg}
              src={friendPic}
              alt="Friend's profile photo"
            />
            <span className={style.friendLinkName}>Ann-Marie</span>
          </li>
          <li className={style.friendLink}>
            <img
              className={style.friendLinkImg}
              src={friendPic}
              alt="Friend's profile photo"
            />
            <span className={style.friendLinkName}>Ann-Marie</span>
          </li>
          <li className={style.friendLink}>
            <img
              className={style.friendLinkImg}
              src={friendPic}
              alt="Friend's profile photo"
            />
            <span className={style.friendLinkName}>Ann-Marie</span>
          </li>
          <li className={style.friendLink}>
            <img
              className={style.friendLinkImg}
              src={friendPic}
              alt="Friend's profile photo"
            />
            <span className={style.friendLinkName}>Ann-Marie</span>
          </li>
          <li className={style.friendLink}>
            <img
              className={style.friendLinkImg}
              src={friendPic}
              alt="Friend's profile photo"
            />
            <span className={style.friendLinkName}>Ann-Marie</span>
          </li>
          <li className={style.friendLink}>
            <img
              className={style.friendLinkImg}
              src={friendPic}
              alt="Friend's profile photo"
            />
            <span className={style.friendLinkName}>Ann-Marie</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
