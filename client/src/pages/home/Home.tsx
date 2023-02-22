import style from "./Home.module.scss";
import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
const Home = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <Nav />
      <div className={style.homeContainer}>
        <Sidebar />
        <Feed username={user.username} />
        <Contactsbar />
      </div>
    </>
  );
};

export default Home;
