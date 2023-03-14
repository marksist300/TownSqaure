import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setUnfollowUser, setFollowUser } from "../../features/user/userSlice";
import {
  useUnFollowUserMutation,
  useFollowUserMutation,
} from "../../features/user/userApiSlice";

import { Remove, Add } from "@mui/icons-material";
import { User } from "../../types";
import style from "./FollowBtn.module.scss";
const FollowBtn = ({ user }: User) => {
  //TODO => TEST FOLLOW BTN CHANGES
  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [unFollowUser] = useUnFollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const [alreadyFollowed, setAlreadyFollowed] = useState(
    currentUser.following.includes(user?._id)
  );

  useEffect(() => {
    if (user && currentUser.following.includes(user._id)) {
      setAlreadyFollowed(true);
    } else {
      setAlreadyFollowed(false);
    }
  }, [user]);

  const handleClick = async () => {
    if (currentUser._id !== user?._id) {
      if (currentUser.following.includes(user._id)) {
        // UNFOLLOW USER
        await unFollowUser({
          userId: user._id,
          currentUserId: currentUser._id,
        }).unwrap();

        setAlreadyFollowed(false);
        // Dispatch to CurrentUser GlobalState
        dispatch(setUnfollowUser(user._id));
      } else {
        // FOLLOW USER
        const output = await followUser({
          userId: user._id,
          currentUserId: currentUser._id,
        }).unwrap();
        setAlreadyFollowed(true);
        // Dispatch to CurrentUser GlobalState
        dispatch(setFollowUser(user._id));
      }
    } else {
      throw new Error("User or Current User missing");
    }
  };
  return user ? (
    <>
      {currentUser._id !== user?._id &&
        (alreadyFollowed ? (
          <button className={style.followBtn} onClick={handleClick}>
            Unfollow <Remove className={style.add} />
          </button>
        ) : (
          <button className={style.followBtn} onClick={handleClick}>
            Follow <Add className={style.add} />
          </button>
        ))}
    </>
  ) : null;
};

export default FollowBtn;
