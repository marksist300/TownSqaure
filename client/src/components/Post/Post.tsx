import { useState, useEffect } from "react";
import style from "./Post.module.scss";
import { MoreVert, Favorite, ThumbUp } from "@mui/icons-material";
const server = import.meta.env.VITE_SERVER_DOMAIN;

type Props = {
  likes: number;
  img: string;
  desc: string;
  comments?: number;
  date: string;
  userId: number;
};

type User = {
  _id: number;
  isAdmin: boolean;
  username: string;
  email: string;
  profilePic: string;
  cover: string;
  following: string;
  followers: string;
};

const Post = ({ likes, img, desc, comments, date, userId }: Props) => {
  const [like, setLike] = useState<React.SetStateAction<number>>(likes);
  const [user, setUser] = useState<User | null>(null);
  const [clickLike, setClickLike] =
    useState<React.SetStateAction<Boolean>>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${server}/users/${userId}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      console.log(Object.keys(data));
      setUser(data);
    };
    fetchUser();
  }, []);
  // const userPic = user.filter(item => item.id === userId);
  // console.log(user.username);
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
              src={user?.profilePic}
              alt="profile pic of user"
            />
            <span className={style.posterName}>{user?.username}</span>
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
