import style from "./CoverImg.module.scss";
import { User } from "../../types";
const CoverImg = ({ user }: User) => {
  return (
    <>
      <img
        className={style.coverImg}
        src={user?.cover ? user?.cover : `/assets/profile/coverDefault.jpg`}
        alt="Profile cover photo"
      />
    </>
  );
};

export default CoverImg;
