import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import { setUser } from "./features/user/userSlice";
import { setLogin } from "./features/auth/authSlice";
import { useGetUserDataMutation } from "./features/auth/authApiSlice";
import { useGetGlobalFollowedUsersMutation } from "./features/followed/followedApiSlice";
import { useGetUserAndFollowedPostsMutation } from "./features/post/postApiSlice";
import jwtDecode from "jwt-decode";
import { setFollowedUsers } from "./features/followed/followed.slice";
import { getAllPosts } from "./features/post/postSlice";

type JWT = {
  id: string;
  ia: number;
  loggedIn: string;
};
function App() {
  //TODO => Search page BE and FE
  //TODO => Refactor following to already existing user state in userSlice
  //TODO => Accessibility for dotmenus on posts
  //TODO => Logout dropw down on photo?
  const authState = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [getUserData, { data, isLoading, isError, error }] =
    useGetUserDataMutation();
  const [getGlobalFollowedUsers] = useGetGlobalFollowedUsersMutation();
  const [getUserAndFollowedPosts] = useGetUserAndFollowedPostsMutation();

  //Function to take user's follow list and fetch the data of each individual user the Global user follows
  //That data is then set into state globally to be used throughout hte app.
  const fetchDataOfFollowedUsers = async (id: string) => {
    const followedUsersData = await getGlobalFollowedUsers(id).unwrap();
    dispatch(setFollowedUsers(followedUsersData));
  };

  const fetchUsersAndFollowedPostsINIT = async (id: string) => {
    const allUsersAndFollowedData = await getUserAndFollowedPosts(id).unwrap();
    dispatch(getAllPosts(allUsersAndFollowedData));
  };

  // Fetch User info if logged in and token valid
  useEffect(() => {
    //Function to fetch user's DATA and set into state
    const fetchData = async (id: string) => {
      const userinfo = await getUserData(id);
      //@ts-ignore
      const user = userinfo.data;
      dispatch(setUser({ ...user }));
    };

    //
    if (authState.token) {
      const { isLoggedIn, token } = authState;
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        const { id }: JWT = jwtDecode(currentToken);
        if (id) {
          dispatch(setLogin({ isLoggedIn: true, token: currentToken }));
          fetchData(id);
        }
      } else if (!currentToken && token) {
        localStorage.setItem("token", JSON.stringify(token));
        dispatch(setLogin({ isLoggedIn: true, token: token }));
      }
    }
  }, [authState.token]);

  //Run a fetch for all followed users and set them into state
  useEffect(() => {
    if (user._id) {
      fetchDataOfFollowedUsers(user._id);
    }
  }, [user.following]);

  //Run a fetch for all global user's and followed users' posts and set them into state
  useEffect(() => {
    if (user._id) {
      fetchUsersAndFollowedPostsINIT(user._id);
    }
  }, [user._id]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={authState?.isLoggedIn ? <Home /> : <Signup />}
          />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/login"
            element={
              authState?.isLoggedIn ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              authState?.isLoggedIn ? <Navigate to="/" replace /> : <Signup />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
