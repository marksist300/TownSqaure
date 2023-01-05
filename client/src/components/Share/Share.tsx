import style from "./Share.module.scss";
import { useContext, useState, useRef } from "react";
import { PermMedia, EmojiEmotions, Label, Room } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { createPost, createPostNoImg } from "../../helpers/apiCalls";

interface Post {
  userId: string;
  description: string;
  img?: string;
}
const Share = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { img, description } = e.target.elements;
    if (user) {
      try {
        if (img.files[0] !== undefined) {
          const formData: any = new FormData();
          formData.append("userId", user._id);
          formData.append("description", description.value);
          formData.append("img", img.files[0]);
          const newPost = await createPost(formData);
          console.log(newPost);
        } else {
          const newPost = await createPostNoImg(
            JSON.stringify({ userId: user._id, description: description.value })
          );
          console.log(newPost);
        }
      } catch (error) {
        return console.error("Error with submit");
      }
    }
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
          />
        </div>
        <hr />
        <div className={style.bottom}>
          <label htmlFor="img" className={style.shareOptions}>
            <PermMedia htmlColor="#f9f9f9" className={style.shareIcon} />
            <span className={style.ShareOptionText}>Image or Video</span>
            <input
              type="file"
              id="img"
              name="img"
              accept=".png,.jpg,.jpeg,.gif"
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
