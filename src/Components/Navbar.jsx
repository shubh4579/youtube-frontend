import "./navbar.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MenuIcon from "@mui/icons-material/Menu";
import youtube from "../assets/youtube.svg";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
function Navbar({ setSideNavbarfunc, sideNavbar }) {
  const [userPic, setUserPic] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const [userModal, setUserModal] = useState(false);

  const [login, setLogin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const handleClickModal = () => {
    setUserModal((prev) => !prev);
  };
  const sideNavbarfunc = () => {
    setSideNavbarfunc(!sideNavbar);
  };

  const handleProfile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setUserModal(false);
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  const onclickOfPopOption = (button) => {
    setUserModal(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  };

  const getLogoutFun = async () => {
    axios
      .post(
        "https://youtube-backend-9m2f.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log("logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let storedUsername = localStorage.getItem("userName");
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
    if (storedUsername) setUsername(storedUsername);
  }, []);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarfunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to={"/"} className="navbar_youtubeImg">
          <img src={youtube} alt="YouTube Logo" />
        </Link>
      </div>
      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input
            type="text"
            className="navbar_searchBoxInput"
            placeholder="Search"
          />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
          <div className="navbar_mike">
            <KeyboardVoiceIcon sx={{ color: "white" }} />
          </div>
        </div>
      </div>
      <div className="navbar-right">
        {isLoggedIn && <span className="navbar-username">{username}</span>}

        <Link to={"/763/upload"}>
          <VideoCallIcon
            sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
          />
        </Link>
        <NotificationsIcon
          sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
        />
        <img
          onClick={handleClickModal}
          src={userPic}
          alt="User"
          className="navbar-right-logo"
        />
        {userModal && (
          <div className="navbar-modal">
            {isLoggedIn && (
              <div className="navbar-modal-option" onClick={handleProfile}>
                Profile
              </div>
            )}

            {isLoggedIn && (
              <div
                className="navbar-modal-option"
                onClick={() => onclickOfPopOption("logout")}
              >
                Logout
              </div>
            )}
            {!isLoggedIn && (
              <div
                className="navbar-modal-option"
                onClick={() => onclickOfPopOption("login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
}
export default Navbar;
