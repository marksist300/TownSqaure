import { useEffect, useState } from "react";

import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";

import style from "./Home.module.scss";
const Home = () => {
  return (
    <>
      <Nav />
      <div className={style.homeContainer}>
        <Sidebar />
        <Feed />
        <Contactsbar />
      </div>
    </>
  );
};

export default Home;
