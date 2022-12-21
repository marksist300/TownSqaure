import style from "./Profile.module.scss";
import { Cake } from "@mui/icons-material";
import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";
const Profile = () => {
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
                src="assets/posts/winter.png"
                alt="Profile cover photo"
              />
              <img
                className={style.userImg}
                src="assets/profile/pic8.jpg"
                alt="profile picture"
              />
            </div>
          </div>
          <div className={style.profileInfo}>
            <h4 className={style.profileName}>Jason Delta</h4>
            <p className={style.profileDescription}>Hi I'm Jason, from .....</p>
          </div>
          <div className={style.profileBottom}>
            <Feed />
            <Contactsbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
