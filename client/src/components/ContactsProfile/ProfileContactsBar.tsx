import { useEffect, useState } from "react";

import FollowBtn from "../FollowBtn/FollowBtn";
import Following from "../Following/Following";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useFetchFollowerListMutation } from "../../features/user/userApiSlice";

import style from "./ProfileContactsBar.module.scss";

import { INIT_USER_STATE } from "../../types";

const ProfileContactsBar = ({
  user,
  display,
}: {
  user: INIT_USER_STATE;
  display: boolean;
}) => {
  //Who the user displayed on the page is following:
  const currentUser = useSelector((state: RootState) => state.user);
  const globalUserFollowingList = useSelector(
    (state: RootState) => state.followed
  );

  const [following, setFollowing] = useState([]);

  const [fetchFollowerList] = useFetchFollowerListMutation();

  //Get the displayed user and if different from current user set into state all the people followed by the displayed user
  useEffect(() => {
    //Function to fetch all followed users and set them into local state so as to have access to their images.
    const getFollowing = async () => {
      try {
        if (user._id !== currentUser._id) {
          const followerList = await fetchFollowerList(user._id).unwrap();
          setFollowing(followerList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Fetch all the users that the displayed user follows and set them into state
    if (user._id !== currentUser._id) {
      getFollowing();
    }
  }, [user!._id]);

  //TODO: replace with ENUM
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

  const followedUsers =
    user._id === currentUser._id
      ? globalUserFollowingList?.map(
          (
            { profilePic, username }: { profilePic: string; username: string },
            i
          ) => <Following profilePic={profilePic} username={username} key={i} />
        )
      : following?.map(({ profilePic, username }, i) => (
          <Following profilePic={profilePic} username={username} key={i} />
        ));

  return display === true ? (
    <section className={style.sideBarSection}>
      <FollowBtn user={user} />
      <h4 className={style.infoTitle}>About {user?.username.split(" ")[0]}</h4>
      <div className={style.infoBarContainer}>
        <div className={style.infoItem}>
          <span className={style.userInfoKey}>Location: </span>
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
          <div className={style.infoItem}>
            <span className={style.userInfoKey}>Description: </span>
            <span className={style.userInfoValue}>{user?.description}</span>
          </div>
        </div>
        <h4 className={style.friendSection}>Friends</h4>
        {/*TODO: => FIX STYLING OF FOLLOWED USERS*/}
        <div className={style.followingSection}>{followedUsers}</div>
      </div>
    </section>
  ) : null;
};

export default ProfileContactsBar;
