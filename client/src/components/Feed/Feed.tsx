import { useState, useEffect } from "react";
import style from "./Feed.module.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
type username = {
  username: string;
};
const Feed = ({ username }: username) => {
  const server = import.meta.env.VITE_SERVER_DOMAIN;
  const id = "63a5d21a31ac7abaf5e68a1d";
  const [postsData, setPostData] = useState<any[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      let urlString = "";
      username
        ? (urlString = `${server}/post/fetchUserPosts/${username}`)
        : (urlString = `${server}/post/fetchAll/${id}`);
      const response = await fetch(urlString, {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      setPostData(data);
    };
    fetcher();
  }, []);

  const posts = postsData.map(item => (
    <Post
      key={item._id}
      likes={item.likes}
      img={item.img}
      userId={item.userId}
      desc={item.description}
      comments={item.comments}
      date={item.date}
    />
  ));

  return (
    <main className={style.feedContainer}>
      <div className={style.wrapper}>
        <Share />
        {posts}
      </div>
    </main>
  );
};

export default Feed;
