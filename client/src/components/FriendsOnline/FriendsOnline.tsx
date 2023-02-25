import style from "./FriendsOnline.module.scss";
import { Link } from "react-router-dom";

const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
const FriendsOnline = ({ user }: any) => {
  // TODO =>  REFACTOR -> make data dynamic
  console.log(user);
  return (
    <Link to={`/profile/${user.username}`} className={style.parentLink}>
      <li className={style.friendLink}>
        <div className={style.friendProfileImgContainer}>
          <img
            className={style.profilePic}
            src={user.profilePic || "/assets/profile/default.png"}
            alt="Friend's profile pic"
          />
          <span className={style.onlineStatus}></span>
        </div>
        <span className={style.friendName}>{user.username || ""}</span>
      </li>
    </Link>
  );
};

export default FriendsOnline;
