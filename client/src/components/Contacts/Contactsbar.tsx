import style from "./Contactsbar.module.scss";
import { Cake } from "@mui/icons-material";
import FriendsOnline from "../FriendsOnline/FriendsOnline";
import { usersData as Users } from "../../dummyData";
import ProfileContactsBar from "../ContactsProfile/ProfileContactsBar";
import HomepageContactsBar from "./HomepageContactsBar";
interface User {
  user: {
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
  } | null;
}
const Contactsbar = ({ user }: User) => {
  return (
    <section className={style.contactsContainer}>
      <div className={style.wrapper}>
        {/* <ProfileContactsBar /> */}
        {user ? <ProfileContactsBar user={user} /> : <HomepageContactsBar />}
      </div>
    </section>
  );
};

export default Contactsbar;
