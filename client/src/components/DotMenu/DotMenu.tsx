import style from "./DotMenu.module.scss";
import { useState, useEffect, useRef } from "react";
import { MoreVert } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { deletePostFromState } from "../../features/post/postSlice";
import { useDeletePostMutation } from "../../features/post/postApiSlice";

const DotMenu = ({ postId }: { postId: string }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [deletePost] = useDeletePostMutation();

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

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    action: string
  ) => {
    e.preventDefault();
    if (!user) {
      return "No User";
    }
    if (user._id) {
      try {
        if (action === "delete") {
          const res = await deletePost({
            userId: user._id,
            postId,
          });

          //@ts-ignore
          if (res!.data === "Post deleted") {
            console.log("DELETING post FROM STATE");
            dispatch(deletePostFromState(postId));
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
