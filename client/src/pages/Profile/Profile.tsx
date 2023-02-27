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
import CoverImg from "../../components/CoverImg/CoverImg";
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
  const params = useParams();
  const currentUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<any>(null);

  const [getProfile, { data, isError, isLoading, error }] =
    useGetProfileMutation();

  //GET user data if user not current global user in state
  useEffect(() => {
    if (currentUser?.username !== params.username) {
      const fetchUserProfilePage = async () => {
        const result = await getProfile(params.username).unwrap();
        setUser(result);
      };
      fetchUserProfilePage();
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
              {currentUser?.username === params.username ? (
                <CoverImg user={currentUser} />
              ) : (
                <CoverImg user={user} />
              )}

              {currentUser?.username === params.username ? (
                <img
                  className={style.userImg}
                  src={
                    currentUser?.profilePic
                      ? currentUser?.profilePic
                      : `/assets/profile/default.png`
                  }
                  alt="profile picture"
                />
              ) : (
                <img
                  className={style.userImg}
                  src={
                    user?.profilePic
                      ? user?.profilePic
                      : `/assets/profile/default.png`
                  }
                  alt="profile picture"
                />
              )}
            </div>
          </div>
          <div className={style.profileInfo}>
            {currentUser?.username === params.username ? (
              <h4 className={style.profileName}>{currentUser?.username}</h4>
            ) : (
              <h4 className={style.profileName}>{user?.username}</h4>
            )}

            {currentUser?.username === params.username ? (
              <p className={style.profileDescription}>
                {currentUser?.description}
              </p>
            ) : (
              <p className={style.profileDescription}>{user?.description}</p>
            )}
          </div>
          <div className={style.profileBottom}>
            <Feed />
            {currentUser?.username === params.username ? (
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
