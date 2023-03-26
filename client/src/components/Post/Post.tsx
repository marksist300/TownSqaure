import { useState, useEffect } from "react";
import style from "./Post.module.scss";
import { Favorite, ThumbUp } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useLikePostApiCallMutation } from "../../features/post/postApiSlice";
//TODO: Handle Like and Unlike via Redux and RTKQ => POST component 👆🏻
import { useFetchPostUserMutation } from "../../features/user/userApiSlice";

import DotMenu from "../DotMenu/DotMenu";
import { PostProps, PostUser } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Post = ({
  likes,
  img,
  desc,
  comments,
  date,
  userId,
  postId,
}: PostProps) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [like, setLike] = useState(likes.length);
  const [user, setUser] = useState<PostUser | null>(null);
  const postFromCurrentUser = userId === currentUser._id;
  const [fetchPostUser] = useFetchPostUserMutation();
  const [likePostApiCall] = useLikePostApiCallMutation();

  //Fetch user photo and details to display on post, if the poster was not the current user.
  useEffect(() => {
    if (!postFromCurrentUser) {
      const fetch = async () => {
        const data = await fetchPostUser(userId).unwrap();
        setUser(data);
      };
      fetch();
    }
  }, []);

  //Handle the like button, increment or decrement count
  const likeClicker = async () => {
    try {
      const data = await likePostApiCall({
        postId,
        userId: currentUser._id,
      }).unwrap();

      if (data === "Post liked") {
        setLike(liked => liked + 1);
      } else if (data === "Post unliked") {
        setLike(liked => liked - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderProfilePic = (current: boolean) => {
    if (current === true) {
      if (currentUser.profilePic !== "") {
        return currentUser.profilePic;
      }
    } else if (user) {
      if (user.profilePic !== "") {
        return user.profilePic;
      }
    }
    return "/assets/profile/default.png";
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
            <Link
              to={
                postFromCurrentUser
                  ? `/profile/${currentUser?.username}`
                  : `/profile/${user?.username}` || "#"
              }
            >
              <img
                className={style.posterProfileImg}
                src={
                  postFromCurrentUser
                    ? renderProfilePic(true)
                    : renderProfilePic(false)
                }
                alt="profile pic"
              />
            </Link>
            <span className={style.posterName}>
              {postFromCurrentUser
                ? currentUser.username
                : user?.username || ""}
            </span>
            <span className={style.postDate}>{format(date)}</span>
          </div>
          <div className={style.topRight}>
            {postFromCurrentUser && <DotMenu postId={postId} />}
          </div>
        </div>
        <div className={style.center}>
          <p className={style.postText}>{desc}</p>
          <img
            src={img}
            alt="User post"
            className={img ? style.postImg : style.hideNoImg}
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
            <span className={style.likeCount}>{likeCountText(like)}</span>
          </div>
          <div className={style.bottomRight}>
            <span
              className={style.commentSection}
            >{`${comments} Comments`}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
