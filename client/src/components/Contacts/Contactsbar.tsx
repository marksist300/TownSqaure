import { useEffect, useState } from "react";

import ProfileContactsBar from "../ContactsProfile/ProfileContactsBar";
import HomepageContactsBar from "./HomepageContactsBar";

import style from "./Contactsbar.module.scss";

const Contactsbar = ({ user }: any) => {
  const [display, setDisplay] = useState(window.innerWidth > 650);

  useEffect(() => {
    const monitorWindowWidth = () => {
      if (window.innerWidth > 650 && display === false) {
        setDisplay(true);
      } else if (window.innerWidth <= 650 && display === true) {
        setDisplay(false);
      }
    };

    window.addEventListener("resize", monitorWindowWidth);

    return () => {
      window.removeEventListener("resize", monitorWindowWidth);
    };
  }, [display]);

  return (
    <section className={style.contactsContainer}>
      <div className={style.wrapper}>
        {user ? (
          <ProfileContactsBar user={user} display={display} />
        ) : (
          <HomepageContactsBar display={display} />
        )}
      </div>
    </section>
  );
};

export default Contactsbar;
