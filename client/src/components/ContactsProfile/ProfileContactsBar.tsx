import style from "./ProfileContactsBar.module.scss";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import Following from "../Following/Following";
import {
  useFetchFollowerListMutation,
  useUnFollowUserMutation,
  useFollowUserMutation,
} from "../../features/user/userApiSlice";
import { setUnfollowUser, setFollowUser } from "../../features/user/userSlice";

const ProfileContactsBar = ({ user }: User) => {
  //Who the user displayed on the page is following:
  const currentUser = useSelector((state: RootState) => state.user);
  const [following, setFollowing] = useState([]);
  const [alreadyFollowed, setAlreadyFollowed] = useState(
    currentUser.following.includes(user._id)
  );
  const dispatch = useDispatch();

  const [fetchFollowerList] = useFetchFollowerListMutation();
  const [unFollowUser] = useUnFollowUserMutation();
  const [followUser] = useFollowUserMutation();

  //Get the displayed user and if different from current user set into state all the people followed by the displayed user
  useEffect(() => {
    //TODO => for current Global User run this function at root level and set all followed users data into global state.
    //Function to fetch all followed users and set them into local state so as to have access to their images.
    const getFollowing = async () => {
      try {
        if (user) {
          const followerList = await fetchFollowerList(user._id).unwrap();
          console.log(followerList);
          setFollowing(followerList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    //if not current user's own page check if page displayed user's page is followed by current user
    if (user && currentUser.following.includes(user?._id)) {
      setAlreadyFollowed(true);
    } else {
      setAlreadyFollowed(false);
    }
    // Fetch all the users that the displayed user follows and set them into state
    if (user._id !== currentUser._id) {
      getFollowing();
    }
  }, [user!._id]);

  const handleClick = async () => {
    if (currentUser._id !== user?._id) {
      if (currentUser.following.includes(user._id)) {
        // UNFOLLOW USER
        await unFollowUser({
          userId: user._id,
          currentUserId: currentUser._id,
        }).unwrap();

        setAlreadyFollowed(false);
        // Dispatch to CurrentUser GlobalState
        dispatch(setUnfollowUser(user._id));
      } else {
        // FOLLOW USER
        const output = await followUser({
          userId: user._id,
          currentUserId: currentUser._id,
        }).unwrap();
        setAlreadyFollowed(true);
        // Dispatch to CurrentUser GlobalState
        dispatch(setFollowUser(user._id));
      }
    } else {
      throw new Error("User or Current User missing");
    }
  };

  //replace with ENUM
  const relationshipStatus = (num: number) => {
    switch (Number(num)) {
      case 1:
        return "Single";
      case 2:
        return "In A Relationship";
      case 3:
        return "Married";
      case 4:
        return "Other";
      default:
        return "Unknown";
    }
  };

  const followedUsers = following?.map(({ profilePic, username }, i) => (
    <Following profilePic={profilePic} username={username} key={i} />
  ));

  return (
    <section className={style.sideBarSection}>
      {currentUser._id !== user?._id &&
        (alreadyFollowed ? (
          <button className={style.followBtn} onClick={handleClick}>
            Unfollow <Remove className={style.add} />
          </button>
        ) : (
          <button className={style.followBtn} onClick={handleClick}>
            Follow <Add className={style.add} />
          </button>
        ))}
      <h4 className={style.infoTitle}>About {user?.username.split(" ")[0]}</h4>
      <div className={style.infoBarContainer}>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>City: </span>
          <span className={style.userInfoValue}>{user?.location}</span>
        </div>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>From: </span>
          <span className={style.userInfoValue}>{user?.hometown}</span>
        </div>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>Relationship: </span>
          <span className={style.userInfoValue}>
            {user?.relationship && relationshipStatus(user?.relationship)}
          </span>
        </div>
        <h4 className={style.friendSection}>Friends</h4>
        {/*TODO: => FIX STYLING OF FOLLOWED USERS*/}
        <div className={style.followingSection}>{followedUsers}</div>
      </div>
    </section>
  );
};

export default ProfileContactsBar;
