import style from "./Contactsbar.module.scss";
import { Cake } from "@mui/icons-material";
import FriendsOnline from "../FriendsOnline/FriendsOnline";
import { usersData as Users } from "../../dummyData";
import ProfileContactsBar from "../ContactsProfile/ProfileContactsBar";
import HomepageContactsBar from "./HomepageContactsBar";
import { User } from "../../types";
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
