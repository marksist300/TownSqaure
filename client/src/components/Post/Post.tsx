import style from "./Post.module.scss";
import profilePic from "../../assets/profile/pic8.jpg";
import testPost from "../../assets/posts/life.jpg";
import { MoreVert, Favorite, ThumbUp } from "@mui/icons-material";
const Post = () => {
  return (
    <article className={style.postSection}>
      <div className={style.wrapper}>
        <div className={style.postTop}>
          <div className={style.topLeft}>
            <img
              className={style.posterProfileImg}
              src={profilePic}
              alt="porifle pic of user"
            />
            <span className={style.posterName}>John Doe</span>
            <span className={style.postDate}> 7 Mins ago</span>
          </div>
          <div className={style.topRight}>
            <MoreVert />
          </div>
        </div>
        <div className={style.center}>
          <p className={style.postText}>First post... Testing....</p>
          <img src={testPost} alt="User post" className={style.postImg} />
        </div>
        <div className={style.bottom}>
          <div className={style.bottomLeft}>
            <Favorite htmlColor="#ef3340" className={style.likeCons} />
            <ThumbUp htmlColor="#2e86e0" className={style.likeCons} />
            <span className={style.likeCount}>32 people like this</span>
          </div>
          <div className={style.bottomRight}>
            <span className={style.commentSection}>7 comments</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
