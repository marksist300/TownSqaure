import { useEffect, useState } from "react";

import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";

import style from "./Home.module.scss";
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    console.log(window.innerWidth);
    const monitorWindowWidth = () => {
      setWindowWidth(() => window.innerWidth);
    };

    window.addEventListener("resize", monitorWindowWidth);

    return () => {
      window.removeEventListener("resize", monitorWindowWidth);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className={style.homeContainer}>
        {windowWidth > 750 && <Sidebar />}
        <Feed />
        {windowWidth > 670 && <Contactsbar />}
      </div>
    </>
  );
};

export default Home;
