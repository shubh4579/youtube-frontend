import { Link } from "react-router-dom";
import "./signup.css";
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function SignUp() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkZYRBtBVCaEhz1388yOV4_o49ovrwNzq5A&s"
  );
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);

  const handleInputField = (event, name) => {
    setSignUpField({ ...signUpField, [name]: event.target.value });
  };
  console.log(signUpField);

  const uploadImage = async (e) => {
    console.log("Uploading image...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    // youtube-clone
    data.append("upload_preset", "youtube-clone");
    try {
      //   cloudName = "dunto5zcb";
      setProgressBar(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dunto5zcb/image/upload",
        data
      );
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({ ...signUpField, profilePic: imageUrl });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    setProgressBar(true);

    axios
      .post(
        "https://youtube-backend-9m2f.onrender.com/auth/signUp",
        signUpField
      )
      .then((res) => {
        toast.success(res.data.message);
        setProgressBar(false);
      })
      .catch((error) => {
        setProgressBar(false);
        toast.error(error);
      });
  };

  return (
    <div className="signUp">
      <div className="signup_card">
        <div className="signUp_title">
          <FaYoutube color="red" size={54} className="login_youtubeImage" />
          Sign Up
        </div>

        <div className="signUp_Inputs">
          <input
            type="text"
            placeholder="Channel Name"
            className="signUp_Inputs_inp"
            value={signUpField.channelName}
            onChange={(e) => handleInputField(e, "channelName")}
          />
          <input
            type="text"
            placeholder="User Name"
            className="signUp_Inputs_inp"
            value={signUpField.userName}
            onChange={(e) => handleInputField(e, "userName")}
          />
          <input
            type="password"
            placeholder="Password"
            className="signUp_Inputs_inp"
            value={signUpField.password}
            onChange={(e) => handleInputField(e, "password")}
          />
          <input
            type="text"
            placeholder="About Your Channel"
            className="signUp_Inputs_inp"
            value={signUpField.about}
            onChange={(e) => handleInputField(e, "about")}
          />

          <div className="image_upload_signup">
            <input type="file" onChange={(e) => uploadImage(e)} />
            <div className="image_upload_signup_div">
              <img
                className="image_default_signUp"
                src={uploadedImageUrl}
                alt=""
              />
            </div>
          </div>
          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignUp}>
              Sign Up
            </div>
            <Link to={"/"} className="signUpBtn">
              Home Page
            </Link>
          </div>

          {progressBar && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default SignUp;
