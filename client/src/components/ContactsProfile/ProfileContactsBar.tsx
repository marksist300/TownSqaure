import style from "./ProfileContactsBar.module.scss";
import { fetchFollowerList } from "../../helpers/apiCalls";
import { useContext, useEffect, useState } from "react";
import Following from "../Following/Following";
import { User } from "../../types";
import { AuthContext } from "../../context/AuthContext";
import { Add, ConstructionOutlined } from "@mui/icons-material";

// TODO: FIX TYPE ERRORS
interface Follow {
  _id: string;
  username: string;
  profilePic: string;
}
const ProfileContactsBar = ({ user }: User) => {
  const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;

  //Who the user displayed on the page is following:
  const [following, setFollowing] = useState<Follow[] | null>(null);
  const [currentUsersFollowList, setCurrentUsersFollowList] = useState<
    string[] | null
  >(null);
  const { user: currentUser } = useContext(AuthContext);

  //Get the displayed user and set into state all the people followed by the displayed user
  useEffect(() => {
    const getFollowing = async () => {
      try {
        if (user) {
          const followerList = await fetchFollowerList(user._id);
          setFollowing(followerList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFollowing();
  }, [user!._id]);

  //Search the current/logged in user to set into state the users that she/he follows
  useEffect(() => {
    const getFollowing = async () => {
      try {
        if (currentUser) {
          const followerList: Follow[] = await fetchFollowerList(
            currentUser._id
          );
          setCurrentUsersFollowList(followerList.map(elem => elem._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFollowing();
  }, [currentUser]);

  const handleClick = () => {
    if (user) {
      if (currentUsersFollowList?.includes(user._id)) {
        // UNFOLLOW USER
      } else {
        // FOLLOW USER
      }
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
      {user?.username !== currentUser?.username && (
        <button className={style.followBtn} onClick={handleClick}>
          Follow <Add className={style.add} />
        </button>
      )}
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
        <div className={style.followingSection}>{followedUsers}</div>
      </div>
    </section>
  );
};

export default ProfileContactsBar;
