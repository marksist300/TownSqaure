import { useState, useEffect } from "react";
import style from "./Feed.module.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { PostType, Username } from "../../types";
import { RootState } from "../../app/store";
import {
  useGetSpecificUsersPostsMutation,
  useGetUserAndFollowedPostsMutation,
} from "../../features/user/userApiSlice";

const Feed = ({ username }: Username) => {
  const server = import.meta.env.VITE_SERVER_DOMAIN;
  const [postsData, setPostData] = useState<PostType[]>([]);
  const user = useSelector((state: RootState) => state.user);

  const [getSpecificUsersPosts] = useGetSpecificUsersPostsMutation();
  const [getUserAndFollowedPosts] = useGetUserAndFollowedPostsMutation();

  //Fetch all a specific user's posts, if the page is not the loggedIn user
  //else if logged in user:
  //  fetch all the posts of a user's posts + the posts of those they follow
  useEffect(() => {
    const fetcher = async () => {
      let data: [];
      if (username !== user.username && username) {
        data = await getSpecificUsersPosts(username).unwrap();
      } else if (user?._id) {
        data = await getUserAndFollowedPosts(user._id).unwrap();
      } else {
        return;
      }
      if (data) {
        if (data.length >= 1) {
          setPostData(
            [...data].sort(
              (a: PostType, b: PostType) =>
                Number(new Date(b.date)) - Number(new Date(a.date))
            )
          );
        }
      }
    };
    fetcher();
  }, [username, user]);

  const posts = postsData.map(item => (
    <Post
      key={item._id}
      likes={item.likes}
      img={item.img}
      userId={item.userId}
      desc={item.description}
      comments={item.comments}
      date={item.date}
      postId={item._id}
    />
  ));

  return (
    <main className={style.feedContainer}>
      <div className={style.wrapper}>
        {username === user?.username && <Share />}
        {posts}
      </div>
    </main>
  );
};

export default Feed;
