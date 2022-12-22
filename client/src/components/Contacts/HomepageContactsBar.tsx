import style from "./Contactsbar.module.scss";
import { Cake } from "@mui/icons-material";
import FriendsOnline from "../FriendsOnline/FriendsOnline";
import { usersData as Users } from "../../dummyData";
const HomepageContactsBar = () => {
  const users = Users.map(user => (
    <FriendsOnline key={`Key${user.id}`} user={user} />
  ));
  const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <>
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
      <img
        className={style.sponsorImg}
        src={assetsPath + "/ad/ad.png"}
        alt="Advert"
      />
      <h4 className={style.title}>Friends Online</h4>
      {users}
    </>
  );
};

export default HomepageContactsBar;
