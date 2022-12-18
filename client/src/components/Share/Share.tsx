import style from "./Share.module.scss";
// import profilePic from "../../assets/profile/pic8.jpg";
import { PermMedia, EmojiEmotions, Label, Room } from "@mui/icons-material";
const Share = () => {
  return (
    <article className={style.shareSection}>
      <div className={style.wrapper}>
        <div className={style.top}>
          <div className={style.imgBox}>
            <img
              className={style.profilePic}
              src="/assets/profile/pic8.jpg"
              alt=""
            />
          </div>
          <input
            className={style.inputBox}
            type="text"
            placeholder="What's on your mind?"
          />
        </div>
        <hr />
        <div className={style.bottom}>
          <div className={style.shareOptions}>
            <PermMedia htmlColor="#f9f9f9" className={style.shareIcon} />
            <span className={style.ShareOptionText}>Image or Video</span>
          </div>
          <div className={style.shareOptions}>
            <Label htmlColor="#2e86e0" className={style.shareIcon} />
            <span className={style.ShareOptionText}>Tag Friends</span>
          </div>
          <div className={style.shareOptions}>
            <Room htmlColor="#ef3340" className={style.shareIcon} />
            <span className={style.ShareOptionText}>Tag Locations</span>
          </div>
          <div className={style.shareOptions}>
            <EmojiEmotions htmlColor="#ffbd20" className={style.shareIcon} />
            <span className={style.ShareOptionText}>React</span>
          </div>
          <button className={style.shareBtn}>Share</button>
        </div>
      </div>
    </article>
  );
};

export default Share;
