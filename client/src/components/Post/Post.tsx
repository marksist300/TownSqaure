import style from "./Post.module.scss";
// import profilePic from "assets/profile/pic8.jpg";
// import testPost from "assets/posts/life.jpg";
import { MoreVert, Favorite, ThumbUp } from "@mui/icons-material";

type Props = {
  likes: Number;
  img: string;
  desc: String;
  comments: Number;
  date: String;
};
const Post = ({ likes, img, desc, comments, date }: Props) => {
  return (
    <article className={style.postSection}>
      <div className={style.wrapper}>
        <div className={style.postTop}>
          <div className={style.topLeft}>
            <img
              className={style.posterProfileImg}
              src="assets/profile/pic8.jpg"
              alt="porifle pic of user"
            />
            <span className={style.posterName}>John Doe</span>
            <span className={style.postDate}>{date}</span>
          </div>
          <div className={style.topRight}>
            <MoreVert />
          </div>
        </div>
        <div className={style.center}>
          <p className={style.postText}>{desc}</p>
          <img src={img} alt="User post" className={style.postImg} />
        </div>
        <div className={style.bottom}>
          <div className={style.bottomLeft}>
            <Favorite htmlColor="#ef3340" className={style.likeCons} />
            <ThumbUp htmlColor="#2e86e0" className={style.likeCons} />
            <span
              className={style.likeCount}
            >{`${likes} people like this`}</span>
          </div>
          <div className={style.bottomRight}>
            <span
              className={style.commentSection}
            >{`${comments} comments`}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
