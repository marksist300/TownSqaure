import style from "./Feed.module.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
const Feed = () => {
  return (
    <main className={style.feedContainer}>
      <div className={style.wrapper}>
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
};

export default Feed;
