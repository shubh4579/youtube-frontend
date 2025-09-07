import { Link } from "react-router-dom";
import "./login.css";
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function Login({ setLoginModal }) {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [progressBar, setProgressBar] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  const handleLogin = () => {
    setProgressBar(true);
    axios
      .post("http://localhost:3000/auth/login", loginField, {
        withCredentials: true,
      })
      .then((res) => {
        setProgressBar(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userProfilePic", res.data.user.profilePic);
        localStorage.setItem("userName", res.data.user.userName);

        window.location.reload();
      })
      .catch((err) => {
        toast.error("Invalid credentials");
        setProgressBar(false);
      });
  };

  return (
    <div className="login">
      <div className="login_card">
        <div className="titleCard_login">
          <FaYoutube color="red" size={54} className="login_youtubeImage" />
          Login
        </div>
        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              placeholder="User Name"
              className="userNameLoginUserName"
              value={loginField.userName}
              onChange={(e) => handleOnChangeInput(e, "userName")}
            />
          </div>

          <div className="userNameLogin">
            <input
              type="password"
              placeholder="Password"
              className="userNameLoginUserName"
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
            />
          </div>
        </div>

        <div className="login_buttons">
          <div className="login-btn" onClick={handleLogin}>
            Login
          </div>
          <Link
            to={"/signup"}
            onClick={() => setLoginModal()}
            className="login-btn"
          >
            Sign Up
          </Link>
          <div className="login-btn" onClick={() => setLoginModal()}>
            Cancel
          </div>
        </div>

        {progressBar && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
