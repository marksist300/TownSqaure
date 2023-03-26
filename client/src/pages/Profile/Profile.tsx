import { useEffect, useState } from "react";
import style from "./Profile.module.scss";
import Nav from "../../components/Navbar/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Contactsbar from "../../components/Contacts/Contactsbar";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetProfileMutation } from "../../features/user/userApiSlice";
import CoverImg from "../../components/CoverImg/CoverImg";
import { Edit } from "@mui/icons-material";
import PhotoModal from "../../components/Modals/UserPhotoModals";
import EditInfoModal from "../../components/Modals/EditInfoModal";
import { INIT_USER_STATE } from "../../types";

interface User {
  cover: string;
  profilePic: string;
  username: string;
  description: string;
  location: string;
  hometown: string;
  email: string;
  following: string[];
  followers: string[];
  relationship: number;
  _id: string;
}
const Profile = () => {
  const params = useParams();
  const currentUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<INIT_USER_STATE | null>();
  const [photoModal, setPhotoModal] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [getProfile, { data, isError, isLoading, error }] =
    useGetProfileMutation();

  //GET user data if user not current global user in state
  useEffect(() => {
    if (currentUser?.username !== params.username) {
      const fetchUserProfilePage = async () => {
        const result = await getProfile(params.username).unwrap();
        setUser(result);
      };
      fetchUserProfilePage();
    }
  }, [params]);

  //Lock screen position when modal is open
  useEffect(() => {
    if (photoModal || editInfo) {
      window.document.body.style.overflow = "hidden";
    } else if (!photoModal && !editInfo) {
      window.document.body.style.overflow = "unset";
    }
  }, [photoModal, editInfo]);

  return (
    <>
      <Nav />
      {photoModal && (
        <PhotoModal setPhotoModal={setPhotoModal} photoModal={photoModal} />
      )}
      {editInfo && (
        <EditInfoModal editInfo={editInfo} setEditInfo={setEditInfo} />
      )}
      <div className={style.profileContainer}>
        <Sidebar />
        <div className={style.profileRight}>
          <div className={style.profileTop}>
            <div className={style.profileCover}>
              {currentUser?.username === params.username ? (
                <CoverImg user={currentUser} />
              ) : (
                <CoverImg user={user as INIT_USER_STATE} />
              )}
              {currentUser?.username === params.username ? (
                <div className={style.userImgBlock}>
                  <img
                    className={style.userImg}
                    src={
                      currentUser?.profilePic
                        ? currentUser?.profilePic
                        : `/assets/profile/default.png`
                    }
                    alt="profile picture"
                  />
                  <button
                    className={style.editUserImgBtn}
                    onClick={() => {
                      setPhotoModal(true);
                    }}
                  >
                    <Edit className={style.editUserImg} />
                  </button>
                </div>
              ) : (
                <div className={style.userImgBlock}>
                  <img
                    className={style.userImg}
                    src={
                      user?.profilePic
                        ? user?.profilePic
                        : `/assets/profile/default.png`
                    }
                    alt="profile picture"
                  />
                </div>
              )}
            </div>
          </div>

          {currentUser?.username === params.username ? (
            <div className={style.profileInfo}>
              <h4 className={style.profileName}>{currentUser?.username}</h4>
              <button
                className={style.editInfoBtn}
                onClick={() => setEditInfo(true)}
              >
                {" "}
                Edit info
              </button>
            </div>
          ) : null}

          {currentUser?.username === params.username ? (
            <p className={style.profileDescription}>
              {currentUser?.description}
            </p>
          ) : (
            <p className={style.profileDescription}>{user?.description}</p>
          )}

          {currentUser?.username === params.username ? (
            <div className={style.profileBottomUser}>
              <div className={style.profileFeedSectionUser}>
                <Feed />
              </div>
              <div className={style.contactsSectionUser}>
                <Contactsbar />
              </div>
            </div>
          ) : (
            <div className={style.profileBottomNotUser}>
              <div className={style.profileFeedSectionNotUser}>
                <Feed />
              </div>
              <div className={style.profileInfoSectionNotUser}>
                <Contactsbar user={user as INIT_USER_STATE} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
