import { useState, useEffect, useContext } from "react";
import style from "./Post.module.scss";
import { Favorite, ThumbUp } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { likePostAPICall, fetchPostUser } from "../../helpers/apiCalls";
import DotMenu from "../DotMenu/DotMenu";
const server = import.meta.env.VITE_SERVER_DOMAIN;
import { PostProps, PostUser } from "../../types";

const Post = ({
  likes,
  img,
  desc,
  comments,
  date,
  userId,
  postId,
}: PostProps) => {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(likes.length);
  const [user, setUser] = useState<PostUser | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPostUser(userId);
      setUser(data);
    };
    fetch();
  }, []);

  const likeClicker = async () => {
    try {
      const data = await likePostAPICall(postId, JSON.stringify(userId));
      if (data === "Post liked") {
        setLike(liked => liked + 1);
      } else if (data === "Post unliked") {
        setLike(liked => liked - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likeCountText = (count: number) => {
    if (count === 0) return "";
    else if (count === 1) return `${count} person likes this`;
    else return `${count} people like this`;
  };
  return (
    <article className={style.postSection}>
      <div className={style.wrapper}>
        <div className={style.postTop}>
          <div className={style.topLeft}>
            <Link to={`/profile/${user?.username}`}>
              <img
                className={style.posterProfileImg}
                src={user?.profilePic || "/assets/profile/default.png"}
                alt="profile pic of user"
              />
            </Link>
            <span className={style.posterName}>{user?.username}</span>
            <span className={style.postDate}>{format(date)}</span>
          </div>
          <div className={style.topRight}>
            <DotMenu postId={postId} userId={userId} />
          </div>
        </div>
        <div className={style.center}>
          <p className={style.postText}>{desc}</p>
          <img src={img} alt="User post" className={style.postImg} />
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
            <span className={style.likeCount}>{likeCountText(like)}</span>
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
