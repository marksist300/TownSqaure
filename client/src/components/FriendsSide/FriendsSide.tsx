import style from "./FriendsSide.module.scss";
import { UserProps } from "../../types";

const FriendsSide = ({ user }: UserProps) => {
  const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <ul className={style.friendList}>
      <li className={style.friendLink}>
        <img
          className={style.friendLinkImg}
          src={assetsPath + user.profile}
          alt="Friend's profile photo"
        />
        <span className={style.friendLinkName}>{user.name}</span>
      </li>
    </ul>
  );
};

export default FriendsSide;
