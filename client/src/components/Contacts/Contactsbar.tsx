import style from "./Contactsbar.module.scss";
import { Cake } from "@mui/icons-material";
// import ad from "../../";
// import profilePic from "../../assets/profile/pic5.jpg";
const Contactsbar = () => {
  return (
    <section className={style.contactsContainer}>
      <div className={style.wrapper}>
        <div className={style.infoSection}>
          <div className={style.newsTitle}>
            <Cake htmlColor="#ffbd20" />
            <h3 className={style.newsWord}>
              <b>News</b>
            </h3>
          </div>
          <span className={style.infoNews}>
            <b className={style.highlight}>Jane Foster</b> and{" "}
            <b className={style.highlight}>1 other friend</b> have a birthday
            today
          </span>
        </div>
        <img className={style.sponsorImg} src="assets/ad/ad.png" alt="" />
        <h4 className={style.title}>Friends Online</h4>
        <ul className={style.friendList}>
          <li className={style.friendLink}>
            <div className={style.friendProfileImgContainer}>
              <img
                className={style.profilePic}
                src="assets/profile/pic5.jpg"
                alt="Friend's profile pic"
              />
              <span className={style.onlineStatus}></span>
            </div>
            <span className={style.friendName}>Sarah Jones</span>
          </li>
          <li className={style.friendLink}>
            <div className={style.friendProfileImgContainer}>
              <img
                className={style.profilePic}
                src="assets/profile/pic5.jpg"
                alt="Friend's profile pic"
              />
              <span className={style.onlineStatus}></span>
            </div>
            <span className={style.friendName}>Sarah Jones</span>
          </li>
          <li className={style.friendLink}>
            <div className={style.friendProfileImgContainer}>
              <img
                className={style.profilePic}
                src="assets/profile/pic5.jpg"
                alt="Friend's profile pic"
              />
              <span className={style.onlineStatus}></span>
            </div>
            <span className={style.friendName}>Sarah Jones</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contactsbar;
