import style from "./Following.module.scss";
const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;

interface Follow {
  username: string;
  profilePic: string;
}

const Following = ({ profilePic, username }: Follow) => {
  return (
    <div className={style.userFollowing}>
      <img
        className={style.userFollowImg}
        src={profilePic || assetsPath + "/profile/pic1.jpg"}
        alt=""
      />
      <span className={style.userFollowingName}>{username}</span>
    </div>
  );
};

export default Following;
