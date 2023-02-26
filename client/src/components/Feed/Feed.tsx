import { useState, useEffect } from "react";
import style from "./Feed.module.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { PostType } from "../../types";
import { RootState } from "../../app/store";
import { useGetSpecificUsersPostsMutation } from "../../features/user/userApiSlice";
import { useParams } from "react-router-dom";

const Feed = () => {
  const pageUserName = useParams().username;
  const [postsData, setPostData] = useState<PostType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const postGlobalState = useSelector((state: RootState) => state.posts);

  const [getSpecificUsersPosts] = useGetSpecificUsersPostsMutation();

  //Fetch all a specific user's posts, if the page is not the loggedIn user
  //else if logged in user:
  //  fetch all the posts of a user's posts + the posts of those they follow
  useEffect(() => {
    console.log("***runing Effect in FEED***");
    const fetcher = async () => {
      setPostData([]);
      let data: PostType[];
      if (user?.username !== pageUserName && pageUserName) {
        data = await getSpecificUsersPosts(pageUserName).unwrap();
      } else if (user?._id) {
        data = postGlobalState;
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
  }, [pageUserName, user, postGlobalState]);

  const posts =
    postsData &&
    postsData.map(item => (
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
        {user.username === pageUserName && <Share />}
        {posts}
      </div>
    </main>
  );
};

export default Feed;
