import style from "./Following.module.scss";
const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
import { Follow } from "../../types";

const Following = ({ profilePic, username }: Follow) => {
  return (
    <div className={style.userFollowing}>
      <img
        className={style.userFollowImg}
        src={profilePic || assetsPath + "/assets/profile/default.png"}
        alt=""
      />
      <span className={style.userFollowingName}>{username}</span>
    </div>
  );
};

export default Following;
