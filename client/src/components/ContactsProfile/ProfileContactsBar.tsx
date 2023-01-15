import style from "./ProfileContactsBar.module.scss";
import { fetchFollowerList } from "../../helpers/apiCalls";
import { useEffect, useState } from "react";
import Following from "../Following/Following";
import { FollowTheSignsRounded } from "@mui/icons-material";
import { User } from "../../types";

interface Follow {
  _id: string;
  username: string;
  profilePic: string;
}
const ProfileContactsBar = ({ user }: User) => {
  const assetsPath = import.meta.env.VITE_PUBLIC_FOLDER;
  const [following, setFollowing] = useState<Follow[] | null>(null);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        if (user) {
          const followerList = await fetchFollowerList(user._id);
          setFollowing(followerList);
          console.log("followerList: ", followerList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFollowers();
  }, []);

  const relationshipStatus = (num: number) => {
    switch (Number(num)) {
      case 1:
        return "Single";
        break;
      case 2:
        return "In A Relationship";
        break;
      case 3:
        return "Married";
        break;
      case 4:
        return "Other";
        break;
      default:
        return "Unknown";
        break;
    }
  };

  const followedUsers = following?.map(({ profilePic, username }) => (
    <Following profilePic={profilePic} username={username} />
  ));
  return (
    <section className={style.sideBarSection}>
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
