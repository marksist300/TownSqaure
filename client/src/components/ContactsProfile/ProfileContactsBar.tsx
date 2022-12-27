import style from "./ProfileContactsBar.module.scss";
interface User {
  user: {
    cover: string;
    profilePic: string;
    username: string;
    description: string;
    location: string;
    hometown: string;
    email: string;
    following: string[];
    followers: string[];
    relationship: number;
  } | null;
}
const ProfileContactsBar = ({ user }: User) => {
  const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
  const relationshipStatus = (num: number) => {
    switch (num) {
      case 1:
        return "Single";
        break;
      case 2:
        return "In A Relationship";
        break;
      case 3:
        return "Married";
        break;
      case 4:
        return "Other";
        break;
    }
  };
  return (
    <section className={style.sideBarSection}>
      <h4 className={style.infoTitle}>About {user?.username.split(" ")[0]}</h4>
      <div className={style.infoBarContainer}>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>City: </span>
          <span className={style.userInfoValue}>{user?.location}</span>
        </div>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>From: </span>
          <span className={style.userInfoValue}>{user?.hometown}</span>
        </div>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>Relationship: </span>
          <span className={style.userInfoValue}>
            {user?.relationship && relationshipStatus(user?.relationship)}
          </span>
        </div>
        <h4 className={style.friendSection}>Friends</h4>
        <div className={style.followingSection}>
          <div className={style.userFollowing}>
            <img
              className={style.userFollowImg}
              src={assetsPath + "/profile/pic1.jpg"}
              alt=""
            />
            <span className={style.userFollowingName}>Jane Doe</span>
          </div>
          <div className={style.userFollowing}>
            <img
              className={style.userFollowImg}
              src={assetsPath + "/profile/pic2.jpg"}
              alt=""
            />
            <span className={style.userFollowingName}>Anna-Maria</span>
          </div>
          <div className={style.userFollowing}>
            <img
              className={style.userFollowImg}
              src={assetsPath + "/profile/pic3.jpg"}
              alt=""
            />
            <span className={style.userFollowingName}>Stan Jobs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContactsBar;
