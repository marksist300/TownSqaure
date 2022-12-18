import style from "./Feed.module.scss";
import Share from "../Share/Share";
const Feed = () => {
  return (
    <main className={style.feedContainer}>
      <div className={style.wrapper}>
        <Share />
      </div>
    </main>
  );
};

export default Feed;
