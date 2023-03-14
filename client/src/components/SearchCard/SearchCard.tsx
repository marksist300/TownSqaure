import { useNavigate } from "react-router";

import FollowBtn from "../FollowBtn/FollowBtn";

import style from "./SearchCard.module.scss";

import { User } from "../../types";

const SearchCard = ({ user }: User) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // <Link to={`/profile/${username}`} className={style.parentLink}>
    navigate(`/profile/${user.username}`);
  };

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
          onClick={handleClick}
        />
      </div>
      <div className={style.userDetails}>
        <span className={style.userFrom}>
          From: {user?.location ? user.location : "Unknown"}
        </span>
        <div className={style.btnSection}>
          <button className={style.profileBtn} onClick={handleClick}>
            View Profile
          </button>
          <FollowBtn user={user} />
        </div>
      </div>
    </article>
  );
};

export default SearchCard;
