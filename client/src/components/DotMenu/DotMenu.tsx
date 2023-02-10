import style from "./DotMenu.module.scss";
import { useState, useEffect, useRef, useContext } from "react";
import { MoreVert } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { deletePost } from "../../helpers/apiCalls";

const DotMenu = ({ postId }: { postId: string }) => {
  const { user } = useContext(AuthContext);
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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const handleClick = async (e: any, action: string) => {
    e.preventDefault();
    if (!user) {
      return "No User";
    }
    if (user) {
      try {
        if (action === "delete") {
          const res = await deletePost(postId, user._id);
          if (res === "Post deleted") {
            window.location.reload();
          } else {
            console.error(res);
          }
        }
      } catch (error) {
        return console.error("Error with submit");
      }
    }
  };

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
          <li
            onClick={e => {
              handleClick(e, "delete");
            }}
          >
            Delete
          </li>
          <li
            onClick={e => {
              handleClick(e, "edit");
            }}
          >
            Edit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DotMenu;
