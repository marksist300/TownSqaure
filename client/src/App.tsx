import { useContext, useEffect } from "react";
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
import { AuthContext } from "./context/AuthContext";

function App() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const storedUser = localStorage.getItem("user");
      if (typeof storedUser === "string") {
        dispatch({
          type: "LOGIN_SUCCEED",
          payload: JSON.parse(storedUser),
        });
      }
    }
  }, []);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Signup />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
