import style from "./ProfileContactsBar.module.scss";
const ProfileContactsBar = () => {
  return (
    <section className={style.sideBarSection}>
      <h4 className={style.infoTitle}>Name Information</h4>
      <div className={style.infoBarContainer}>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>City: </span>
          <span className={style.userInfoValue}>Stockholm</span>
        </div>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>From: </span>
          <span className={style.userInfoValue}>Amsterdam</span>
        </div>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>Relationship: </span>
          <span className={style.userInfoValue}>Married</span>
        </div>
        <h4 className={style.friendSection}>Friends</h4>
        <div className={style.followingSection}>
          <div className={style.userFollowing}>
            <img
              className={style.userFollowImg}
              src="assets/profile/pic1.jpg"
              alt=""
            />
            <span className={style.userFollowingName}>Jane Doe</span>
          </div>
          <div className={style.userFollowing}>
            <img
              className={style.userFollowImg}
              src="assets/profile/pic2.jpg"
              alt=""
            />
            <span className={style.userFollowingName}>Anna-Maria</span>
          </div>
          <div className={style.userFollowing}>
            <img
              className={style.userFollowImg}
              src="assets/profile/pic3.jpg"
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
