import style from "./Modal.module.scss";
import { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import { AddAPhoto, InsertPhoto } from "@mui/icons-material";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useUploadPhotoMutation } from "../../features/user/userApiSlice";
import { updateUserProfileImgs } from "../../features/user/userSlice";
type Props = {
  photoModal: boolean;
  setPhotoModal: (active: boolean) => void;
};

type Upload = {
  profilePic?: string;
  cover?: string;
};

//TODO: handle form data sending to DB Updating state.
const PhotoModal = ({ photoModal, setPhotoModal }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const clickRef = useRef<HTMLFormElement>(null);
  const uploadProfilePic = useRef<HTMLInputElement>(null);
  const uploadCoverPic = useRef<HTMLInputElement>(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [uploadPhoto] = useUploadPhotoMutation();
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
    setPhotoModal(false);
    setClicked(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setClicked(true);
    //Take form data, parse it and send it to the back end.
    const { profilePic, cover } = e.target.elements;
    if (user) {
      try {
        if (profilePic.files[0] !== undefined || cover.files[0] !== undefined) {
          //if an image file is attached upload image
          const formData: FormData = new FormData();
          formData.append("userId", user._id);
          if (profilePic) {
            formData.append("profilePic", profilePic.files[0]);
          }
          if (cover) {
            formData.append("cover", cover.files[0]);
          }
          //CHANGE TO PROMISE AND UPDATE TYPES
          const newPhoto: any = await uploadPhoto({
            userId: user._id,
            formData,
          }).unwrap();
          if (newPhoto) {
            const { coverPhotoUrl, coverPhotoId, profilePicUrl, profilePicId } =
              newPhoto;
            dispatch(
              updateUserProfileImgs({
                cover: coverPhotoUrl,
                coverId: coverPhotoId,
                profilePic: profilePicUrl,
                profilePicId,
              })
            );
            closeModal();
          }
        } else {
          console.log("No images attached");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={style.modalContainer}>
      <form ref={clickRef} onSubmit={handleSubmit} id="formContainer">
        <button
          onClick={e => {
            closeModal(e);
          }}
          aria-label="Close photo upload form"
          className={style.onCloseBtn}
        >
          <Close />
        </button>
        {/* TODO: ADD lock focus into modal when open */}
        <h3 className={style.title}>Upload Your Photo</h3>

        <div className={style.uploadBtns}>
          <div className={style.profilePicSection}>
            <label className={style.labelText} htmlFor="profilePic">
              Profile Photo
            </label>
            <button
              type="button"
              onClick={e => {
                uploadProfilePic.current?.click();
              }}
              className={style.profilePicParentBtn}
              aria-label="Upload Profile Photo"
            >
              <AddAPhoto className={style.imgBtns} />
              <input
                ref={uploadProfilePic}
                type="file"
                name="profilePic"
                id="profilePic"
                className={style.profilePicInput}
              />
            </button>
          </div>

          <div className={style.profilePicSection}>
            <label className={style.labelText} htmlFor="cover">
              Cover Photo
            </label>
            <button
              type="button"
              className={style.profilePicParentBtn}
              aria-label="Upload Cover Photo"
              onClick={e => {
                uploadCoverPic.current?.click();
              }}
            >
              <InsertPhoto className={style.imgBtns} />
              <input
                ref={uploadCoverPic}
                type="file"
                name="cover"
                id="cover"
                className={style.profilePicInput}
              />
            </button>
          </div>
        </div>

        {error && (
          <p className="self-center text-red-500">
            At least one field must be filled
          </p>
        )}

        <button className={clicked ? style.submitBtnClicked : style.submitBtn}>
          {clicked ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PhotoModal;
