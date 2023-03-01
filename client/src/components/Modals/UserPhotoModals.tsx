import style from "./Modal.module.scss";
import { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import { AddAPhoto, InsertPhoto } from "@mui/icons-material";

type Props = {
  photoModal: boolean;
  setPhotoModal: (active: boolean) => void;
};
//SETBIO as props
const PhotoModal = ({ photoModal, setPhotoModal }: Props) => {
  const clickRef = useRef<HTMLFormElement>(null);

  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (clickRef.current) {
        if (!clickRef.current.contains(e.target as Element)) {
          closeModal();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const closeModal = (e?: any) => {
    e.preventDefault();
    // setPhotoModal(false);
    setClicked(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);

    let aboutData, hobbiesData, missionData;
    if (!e.target) {
      throw new Error("no event target");
    }
    const { about, hobbies, mission } = (e.target as any).elements;

    if (about.value !== null && about.value.trim() !== "") {
      aboutData = about.value;
    }
    if (hobbies.value !== null && hobbies.value.trim() !== "") {
      hobbiesData = hobbies.value;
    }
    if (mission.value !== null && mission.value.trim() !== "") {
      missionData = mission.value;
    }

    if (!aboutData && !hobbiesData && !missionData) {
      return setError(true);
    } else {
      setError(false);

      // const res = await updateBio(
      //   user.id,
      //   aboutData,
      //   hobbiesData,
      //   missionData,
      //   auth.token
      // );

      // if (res) {
      //   closeModal();
      //   dispatch(
      //     setBio({
      //       hobbies: hobbiesData,
      //       about: aboutData,
      //       mission: missionData,
      //     })
      //   );
      // }
    }
  };
  return (
    <div className={style.modalContainer}>
      <form ref={clickRef} onSubmit={handleSubmit}>
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
              className={style.profilePicParentBtn}
              aria-label="Upload Profile Photo"
            >
              <AddAPhoto className={style.imgBtns} />
              <input
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
              className={style.profilePicParentBtn}
              aria-label="Upload Cover Photo"
            >
              <InsertPhoto className={style.imgBtns} />
              <input
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
