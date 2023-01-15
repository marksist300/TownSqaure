import style from "./DotMenu.module.scss";
import {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { MoreVert } from "@mui/icons-material";

const DotMenu = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const clickRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
        setDisplayMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  return (
    <div className={style.dropdown} ref={clickRef}>
      <button className={style.dropdownLink}>
        <MoreVert onClick={() => setDisplayMenu(prev => !prev)} />
      </button>
      <div
        className={
          displayMenu ? style.dropdownMenuActive : style.dropdownMenuInactive
        }
        id="menu"
      >
        <ul className={style.dropdownList}>
          <li>Delete</li>
          <li>Edit</li>
        </ul>
      </div>
    </div>
  );
};

export default DotMenu;
