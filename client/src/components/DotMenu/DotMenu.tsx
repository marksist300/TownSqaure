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
  const clickRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<any>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
        setDisplayMenu(false);
      } else return;
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  useEffect(() => {
    if (displayMenu === true) {
      function handleEscKey(e: KeyboardEvent) {
        console.log(e.code);
        if (e.code === "Escape") {
          setDisplayMenu(false);
        } else if (e.code === "Tab" || e.key === "Shift") {
          if (e.code !== "Tab") return;
          if (clickRef.current) {
            const elements = Array.from(
              clickRef.current.querySelectorAll("li")
            );
            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            if (e.shiftKey) {
              if (
                //Shift key down cycle backwards through all tab elements in open modal
                !menuRef.current.contains(document.activeElement) ||
                document.activeElement === firstElement
              ) {
                lastElement.focus();
                e.preventDefault();
              }
            } else if (
              //Shift ket not down, cycle through all tab elements in open modal.
              !menuRef.current.contains(document.activeElement) ||
              document.activeElement === lastElement
            ) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        } else if (e.code === "Enter") {
          const name = document.activeElement?.id;
          const targetEl = menuRef.current.querySelector(`#${name}`);
          targetEl.click();
        }
      }

      document.addEventListener("keydown", handleEscKey);

      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [displayMenu]);

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
      <button
        className={style.dropdownLink}
        onClick={() => setDisplayMenu(prev => !prev)}
      >
        <MoreVert />
      </button>
      {/*Menu OPEN */}
      <div
        className={
          displayMenu ? style.dropdownMenuActive : style.dropdownMenuInactive
        }
        id="menu"
      >
        <ul className={style.dropdownList} ref={menuRef}>
          <li
            tabIndex={1}
            id="delete"
            onClick={e => {
              handleClick(e, "delete");
            }}
          >
            Delete
          </li>
          <li
            tabIndex={2}
            id="edit"
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
