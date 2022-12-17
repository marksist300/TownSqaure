import style from "./Home.module.scss";
import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";
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
