import { INIT_USER_STATE } from "../../types";
import style from "./SearchCard.module.scss";

const SearchCard = ({ user }: { user: INIT_USER_STATE | null }) => {
  return (
    <article className={style.container}>
      <div className={style.userImgSec}>
        <span>{user?.username ? user.username : ""}</span>
        <img
          src={
            user?.profilePic ? user.profilePic : `/assets/profile/default.png`
          }
          alt=""
          className={style.userImg}
        />
      </div>
      <div className={style.userDetails}>
        <span className={style.userFrom}>
          From: {user?.location ? user.location : "Unknown"}
        </span>
        <div className={style.btnSection}>
          <button className={style.btns}>View Profile</button>
          <button className={style.btns}>Follow</button>
        </div>
      </div>
    </article>
  );
};

export default SearchCard;
