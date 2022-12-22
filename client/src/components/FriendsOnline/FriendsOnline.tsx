import style from "./FriendsOnline.module.scss";
type Props = {
  user: {
    profile: string;
    name: string;
    id: number;
  };
};
const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
const FriendsOnline = ({ user }: Props) => {
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
