import { useState } from "react";
import style from "./Post.module.scss";
import { usersData as Users } from "../../dummyData";
import { MoreVert, Favorite, ThumbUp } from "@mui/icons-material";

type Props = {
  likes: number;
  img?: string;
  desc?: String;
  comments?: Number;
  date: String;
  userId: number;
};
const Post = ({ likes, img, desc, comments, date, userId }: Props) => {
  const [like, setLike] = useState<React.SetStateAction<number>>(likes);
  const [clickLike, setClickLike] =
    useState<React.SetStateAction<Boolean>>(false);
  const userPic = Users.filter(item => item.id === userId);
  const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;

  const likeClicker = () => {
    if (clickLike === true) {
      setLike((like: number) => (like -= 1));
      setClickLike(false);
    } else {
      setLike((like: number) => (like += 1));
      setClickLike(true);
    }
  };
  return (
    <article className={style.postSection}>
      <div className={style.wrapper}>
        <div className={style.postTop}>
          <div className={style.topLeft}>
            <img
              className={style.posterProfileImg}
              src={assetsPath + userPic[0].profile}
              alt="porifle pic of user"
            />
            <span className={style.posterName}>Name</span>
            <span className={style.postDate}>{date}</span>
          </div>
          <div className={style.topRight}>
            <MoreVert />
          </div>
        </div>
        <div className={style.center}>
          <p className={style.postText}>{desc}</p>
          <img
            src={assetsPath + img}
            alt="User post"
            className={style.postImg}
          />
        </div>
        <div className={style.bottom}>
          <div className={style.bottomLeft}>
            <Favorite
              htmlColor="#ef3340"
              className={style.likeCons}
              onClick={likeClicker}
            />
            <ThumbUp
              htmlColor="#2e86e0"
              className={style.likeCons}
              onClick={likeClicker}
            />
            <span
              className={style.likeCount}
            >{`${like} people like this`}</span>
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
