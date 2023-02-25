import style from "./Contactsbar.module.scss";
import ProfileContactsBar from "../ContactsProfile/ProfileContactsBar";
import HomepageContactsBar from "./HomepageContactsBar";
const Contactsbar = ({ user }: any) => {
  return (
    <section className={style.contactsContainer}>
      <div className={style.wrapper}>
        {user ? <ProfileContactsBar user={user} /> : <HomepageContactsBar />}
      </div>
    </section>
  );
};

export default Contactsbar;
