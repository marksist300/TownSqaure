import style from "./Feed.module.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { postsData } from "../../dummyData";
const Feed = () => {
  const posts = postsData.map(item => (
    <Post
      key={item.id}
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
