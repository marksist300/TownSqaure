import style from "./FriendsOnline.module.scss";
import { UserProps } from "../../types";

const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
const FriendsOnline = ({ user }: UserProps) => {
  return (
    <ul className={style.friendList}>
      <li className={style.friendLink}>
        <div className={style.friendProfileImgContainer}>
          <img
            className={style.profilePic}
            src={assetsPath + user.profile}
            alt="Friend's profile pic"
          />
          <span className={style.onlineStatus}></span>
        </div>
        <span className={style.friendName}>{user.name}</span>
      </li>
    </ul>
  );
};

export default FriendsOnline;
