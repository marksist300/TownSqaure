import { useState, useEffect } from "react";
import style from "./Feed.module.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { PostType, Username } from "../../types";
import { RootState } from "../../app/store";

const Feed = ({ username }: Username) => {
  const server = import.meta.env.VITE_SERVER_DOMAIN;
  const [postsData, setPostData] = useState<PostType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const fetcher = async () => {
      let urlString = "";
      if (username) {
        urlString = `${server}/post/fetchUserPosts/${username}`;
      } else if (user?._id) {
        urlString = `${server}/post/fetchAll/${user?._id}`;
      }

      if (urlString.length > 1) {
        const response = await fetch(urlString, {
          headers: {
            "Content-Type": "Application/json",
          },
          method: "GET",
          mode: "cors",
        });
        const data = await response.json();
        if (data.ok) {
          setPostData(
            data.sort(
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
