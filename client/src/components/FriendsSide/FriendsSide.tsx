import style from "./FriendsSide.module.scss";
import { Link } from "react-router-dom";

import { User } from "../../types";

const FriendsSide = ({ user }: User) => {
  return (
    <Link to={`/profile/${user.username}`} className={style.parentLink}>
      <li className={style.friendLink}>
        <img
          className={style.friendLinkImg}
          src={user.profilePic || "/assets/profile/default.png"}
          alt="Friend's profile photo"
        />
        <span className={style.friendLinkName}>{user.username || ""}</span>
      </li>
    </Link>
  );
};

export default FriendsSide;
