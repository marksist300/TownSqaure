import style from "./Share.module.scss";
import { useContext, useState, useRef } from "react";
import { PermMedia, EmojiEmotions, Label, Room } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { createPost } from "../../helpers/apiCalls";

const Share = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState<object | null>(null);
  const desc = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const postData = {
        userId: user._id,
        description: desc.current?.value,
      };
      const newPost = await createPost(postData);
      console.log(newPost);
    } else {
      return console.error("Error with submit");
    }
    console.log(desc.current?.value);
  };
  return (
    <article className={style.shareSection}>
      <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.top}>
          <div className={style.imgBox}>
            <img
              className={style.profilePic}
              src={user?.profilePic || "/assets/profile/default.png"}
              alt="User Profile Picture"
            />
          </div>
          <input
            className={style.inputBox}
            type="text"
            placeholder="What's on your mind?"
            name="description"
            ref={desc}
          />
        </div>
        <hr />
        <div className={style.bottom}>
          <label htmlFor="file" className={style.shareOptions}>
            <PermMedia htmlColor="#f9f9f9" className={style.shareIcon} />
            <span className={style.ShareOptionText}>Image or Video</span>
            <input
              type="file"
              id="file"
              name="file"
              accept=".png,.jpg,.jpeg"
              className={style.dataFileInput}
            />
          </label>
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
      </form>
    </article>
  );
};

export default Share;
