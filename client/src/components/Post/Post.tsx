import style from "./Post.module.scss";
import { usersData as Users } from "../../dummyData";
import { MoreVert, Favorite, ThumbUp } from "@mui/icons-material";

type Props = {
  likes: Number;
  img?: string;
  desc?: String;
  comments?: Number;
  date: String;
  userId: Number;
};
const Post = ({ likes, img, desc, comments, date, userId }: Props) => {
  const userPic = Users.filter(item => item.id === userId);
  console.log(userPic[0].name);
  return (
    <article className={style.postSection}>
      <div className={style.wrapper}>
        <div className={style.postTop}>
          <div className={style.topLeft}>
            <img
              className={style.posterProfileImg}
              src={userPic[0].profile}
              alt="porifle pic of user"
            />
            <span className={style.posterName}>{userPic[0].name}</span>
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
