import { useEffect, useState } from "react";
import style from "./Profile.module.scss";
import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";

const server = import.meta.env.VITE_SERVER_DOMAIN;
interface User {
  cover: string;
  profilePic: string;
  username: string;
  description: string;
  location: string;
  hometown: string;
  email: string;
  following: string[];
  followers: string[];
  relationship: number;
}

const Profile = () => {
  const defaultimgs = "/assets/profile/";
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(`${server}/users?username=Aaron Delta`, {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      setUser(data);
    };
    fetcher();
  }, []);
  return (
    <>
      <Nav />
      <div className={style.profileContainer}>
        <Sidebar />
        <div className={style.profileRight}>
          <div className={style.profileTop}>
            <div className={style.profileCover}>
              <img
                className={style.coverImg}
                src={user?.cover || `${defaultimgs}coverDefault.jpg`}
                alt="Profile cover photo"
              />
              <img
                className={style.userImg}
                src={user?.profilePic || `${defaultimgs}default.png`}
                alt="profile picture"
              />
            </div>
          </div>
          <div className={style.profileInfo}>
            <h4 className={style.profileName}>{user?.username}</h4>
            <p className={style.profileDescription}>{user?.description}</p>
          </div>
          <div className={style.profileBottom}>
            <Feed username="Stan Jobs" />
            <Contactsbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
