import { useState, useRef, useEffect } from "react";

import NavItem from "./NavItem";

import { logoutUser } from "../../features/user/userSlice";
import { resetFollowers } from "../../features/followed/followed.slice";
import { resetPosts } from "../../features/post/postSlice";
import { logoutAuth } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";

import style from "./Nav.module.scss";

const NavDropDown = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [loggedInMenuHidden, setLoggedInMenuHidden] = useState(false);
  const clickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //close menu on any clicks outside of menu area
    function handleClickOutside(e: MouseEvent) {
      if (clickRef.current) {
        if (!clickRef.current.contains(e.target as Node)) {
          setLoggedInMenuHidden(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  useEffect(() => {
    if (loggedInMenuHidden === true) {
      //close menu on escape key and trap focus for tabbing while menu is open
      function handleEscKey(e: KeyboardEvent) {
        if (e.code === "Escape") {
          setLoggedInMenuHidden(false);
        } else if (e.code === "Tab" || e.key === "Shift") {
          if (e.code !== "Tab") return;
          if (clickRef.current) {
            const elements = Array.from(clickRef.current.querySelectorAll("a"));
            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            if (e.shiftKey) {
              if (
                //Shift key down cycle backwards through all tab elements in open modal
                !clickRef.current.contains(document.activeElement) ||
                document.activeElement === firstElement
              ) {
                lastElement.focus();
                e.preventDefault();
              }
            } else if (
              //Shift ket not down, cycle through all tab elements in open modal.
              !clickRef.current.contains(document.activeElement) ||
              document.activeElement === lastElement
            ) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }

      document.addEventListener("keydown", handleEscKey);

      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [loggedInMenuHidden]);

  const toggleDropDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoggedInMenuHidden(state => !state);
  };

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(resetFollowers());
    dispatch(resetPosts());
    dispatch(logoutAuth());
  };
  return (
    <div className={style.dropDownMenu} ref={clickRef}>
      <button className={style.imageContainer} onClick={e => toggleDropDown(e)}>
        <img
          src={user.profilePic || "/assets/profile/default.png"}
          alt=""
          className={style.userImg}
        />
      </button>

      <ul className={loggedInMenuHidden ? style.menuBox : style.hidden}>
        <NavItem
          tabIndex={0}
          output={"Profile"}
          direction={`/profile/${user?.username}`}
          setClicker={setClick}
          clicker={click}
          setLoggedInMenuHidden={setLoggedInMenuHidden}
        />

        <div
          onClick={e => {
            handleLogout(e);
          }}
        >
          <NavItem
            tabIndex={1}
            output={"Logout"}
            direction={"/login"}
            setClicker={setClick}
            clicker={click}
            setLoggedInMenuHidden={setLoggedInMenuHidden}
          />
        </div>
      </ul>
    </div>
  );
};

export default NavDropDown;
