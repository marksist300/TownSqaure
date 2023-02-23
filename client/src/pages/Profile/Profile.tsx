import { useEffect, useState } from "react";
import style from "./Profile.module.scss";
import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetProfileMutation } from "../../features/user/userApiSlice";

const assets = import.meta.env.VITE_PUBLIC_FOLDER;
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
  _id: string;
}
const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<User | null>(null);
  const [OwnHomePage, setOwnHomePage] = useState(
    currentUser?._id !== user?._id
  );
  const params = useParams();

  const [getProfile, { data, isError, isLoading, error }] =
    useGetProfileMutation();

  //GET user data if user not current global user in state
  useEffect(() => {
    if (currentUser?._id !== user?._id) {
      const fetchUserProfilePage = async () => {
        console.log("running fetch on");
        const result = await getProfile(params.username).unwrap();
        setOwnHomePage(false);
        setUser(result);
      };
      fetchUserProfilePage();
    } else if (currentUser?._id === user?._id) {
      setOwnHomePage(true);
    }
  }, [params]);
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
                src={
                  OwnHomePage === true
                    ? currentUser?.cover
                    : user?.cover || `${assets}/profile/coverDefault.jpg`
                }
                alt="Profile cover photo"
              />
              <img
                className={style.userImg}
                src={
                  OwnHomePage === true
                    ? currentUser?.profilePic
                    : user?.profilePic || `${assets}/profile/default.png`
                }
                alt="profile picture"
              />
            </div>
          </div>
          <div className={style.profileInfo}>
            <h4 className={style.profileName}>{user?.username}</h4>
            <p className={style.profileDescription}>{user?.description}</p>
          </div>
          <div className={style.profileBottom}>
            <Feed username={params.username} />
            {OwnHomePage === true ? (
              <Contactsbar />
            ) : (
              <Contactsbar user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
