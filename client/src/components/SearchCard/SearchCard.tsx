import { INIT_USER_STATE } from "../../types";
import style from "./SearchCard.module.scss";

const SearchCard = ({ user }: { user: INIT_USER_STATE | null }) => {
  return (
    <article className={style.container}>
      <div className={style.userImgSec}>
        <span>User Name</span>
        <img
          src="/assets/profile/default.png"
          alt=""
          className={style.userImg}
        />
      </div>
      <div className={style.userDetails}>
        <span>Name: data</span>
        <span>From: data</span>
        <div className={style.btnSection}>
          <button className={style.btns}>View Profile</button>
          <button className={style.btns}>Follow</button>
        </div>
      </div>
    </article>
  );
};

export default SearchCard;
