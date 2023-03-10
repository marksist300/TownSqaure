import style from "./Modal.module.scss";
import { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
type Props = {
  editInfo: boolean;
  setEditInfo: (active: boolean) => void;
};

interface dataType {
  name?: string;
  location?: string;
  home?: string;
  relationship?: number;
}

//TODO: handle form data sending to DB Updating state.
const EditInfoModal = ({ editInfo, setEditInfo }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const clickRef = useRef<HTMLFormElement>(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (clickRef.current) {
        if (!clickRef.current.contains(e.target as Element)) {
          closeModal();
        }
      }
    }
    function handleEscKey(e: KeyboardEvent) {
      if (e.code === "Escape") {
        closeModal();
      } else if (e.code === "Tab" || e.key === "Shift") {
        if (e.code !== "Tab") return;
        if (clickRef.current) {
          const elements = Array.from(
            clickRef.current.querySelectorAll("button")
          );
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
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [clickRef]);

  const closeModal = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    setEditInfo(false);
    setClicked(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setClicked(true);
    //Take userData and parse it
    const { name, location, hometown, relationship } = e.target.elements;
    if (user) {
      if (
        !name.value &&
        !location.value &&
        !hometown.value &&
        relationship.value === "0"
      ) {
        setError(true);
      }
      try {
        //Check data exists and if so fit into object ready to send to BE.
        const data: dataType = {};
        if (name.value !== null) {
          data["name"] = name.value;
        }
        if (location.value !== null) {
          data["location"] = location.value;
        }
        if (hometown.value !== null) {
          data["home"] = hometown.value;
        }
        if (relationship !== "0") {
          data["relationship"] = relationship.value;
        }
        //TODO: HANDLE USER DATA UPLOAD;
        // if(input data){
        //   //Send data to the DB to update User info
        //   //If data update ok, set new data into state to update UI
        //     // closeModal();
        // } else {
        //   console.log("No images attached");
        //   setError()
        //   return;
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const relationships = [
    "Please Select",
    "Single",
    "In A Relationship",
    "Married",
    "Other",
  ];

  const options = [...Array(4)].map((elem, i) => (
    <option value={i} key={`${elem}${i}`}>
      {relationships[i]}
    </option>
  ));

  return (
    <div className={style.modalContainer}>
      <form
        ref={clickRef}
        onSubmit={handleSubmit}
        id="formContainer"
        className={style.editInfoForm}
      >
        <button
          onClick={e => {
            closeModal(e);
          }}
          aria-label="Exit Edit User Information Page"
          className={style.onCloseBtn}
        >
          <Close />
        </button>
        <h3 className={style.title}>Edit Your Info</h3>
        <div className={style.uploadBtns}>
          <div className={style.editInputSections}>
            <label className={style.labelText} htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={style.editInfoInput}
            />
          </div>
          <div className={style.editInputSections}>
            <label className={style.labelText} htmlFor="location">
              Your Current location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className={style.editInfoInput}
            />
          </div>

          <div className={style.editInputSections}>
            <label className={style.labelText} htmlFor="hometown">
              Where You're From
            </label>
            <input
              type="text"
              name="hometown"
              id="hometown"
              className={style.editInfoInput}
            />
          </div>

          <div className={style.editInputSections}>
            <label className={style.labelText} htmlFor="hometown">
              Relationship Status
            </label>
            <select
              className={style.editInfoInput}
              name="relationship"
              id="relationship"
            >
              {options}
            </select>
          </div>
        </div>

        {error && (
          <p className={style.errorText}>At least one field must be filled</p>
        )}

        <button className={clicked ? style.submitBtnClicked : style.submitBtn}>
          {clicked ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditInfoModal;
