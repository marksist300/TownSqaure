import { NavLink } from "react-router-dom";
import style from "./Nav.module.scss";

const NavItem = ({
  output,
  direction,
  clicker,
  setClicker,
  setLoggedInMenuHidden,
}: any) => {
  const handleClick = () => {
    if (clicker) {
      setClicker(!clicker);
    }
    if (setLoggedInMenuHidden) {
      setLoggedInMenuHidden(false);
    }
  };

  if (clicker) {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  } else {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "visible";
    }
  }

  return (
    <li className={style.navItem}>
      <NavLink
        onClick={() => {
          handleClick();
        }}
        className={style.navLinks}
        to={direction}
      >
        {output}
      </NavLink>
    </li>
  );
};

export default NavItem;
