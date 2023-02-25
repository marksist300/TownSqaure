import style from "./Following.module.scss";
import { Link } from "react-router-dom";
import { Follow } from "../../types";

const Following = ({ profilePic, username }: Follow) => {
  return (
    <Link to={`/profile/${username}`} className={style.parentLink}>
      <div className={style.userFollowing}>
        <img
          className={style.userFollowImg}
          src={profilePic || "/assets/profile/default.png"}
          alt=""
        />
        <span className={style.userFollowingName}>{username}</span>
      </div>
    </Link>
  );
};

export default Following;
