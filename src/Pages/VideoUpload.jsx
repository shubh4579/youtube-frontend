import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./videoupload.css";
import { FaYoutube } from "react-icons/fa";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function VideoUpload() {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
  });

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    console.log("Uploading image...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    // youtube-clone
    data.append("upload_preset", "youtube-clone");
    try {
      //   cloudName = "dunto5zcb";
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dunto5zcb/${type}/upload`,
        data
      );

      const url = response.data.url;
      setLoader(false);
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({ ...inputField, [val]: url });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };
  console.log(inputField);
  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    await axios
      .post("https://youtube-backend-9m2f.onrender.com/api/video", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setInputField(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setInputField(false);
      });
  };
  return (
    <div className="videoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <FaYoutube color="red" size={54} />
          Upload Video
        </div>
        <form className="uploadForm">
          <input
            type="text"
            className="uploadFormInputs"
            placeholder="Title Of Video"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
          />
          <input
            type="text"
            className="uploadFormInputs"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
          />
          <input
            type="text"
            className="uploadFormInputs"
            placeholder="Category"
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, "videoType")}
          />
          <div>
            Thumbnail{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, "image")}
            />
          </div>
          <div>
            Video{" "}
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => uploadImage(e, "video")}
            />
          </div>

          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}

          <div className="uploadBtns">
            <button className="uploadBtn-form" onClick={handleSubmit}>
              Upload
            </button>
            <Link to={"/"}>
              <button className="uploadBtn-form">Home</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default VideoUpload;
