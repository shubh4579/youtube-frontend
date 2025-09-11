import { Profiler, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video";
import Profile from "./Pages/Profile";
import VideoUpload from "./Pages/VideoUpload";
import SignUp from "./Pages/SignUp";

import { useEffect } from "react";

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  useEffect(() => {
    // Ping backend to wake it up
    fetch("https://youtube-backend-9m2f.onrender.com")
      .then(() => console.log("Backend wake-up ping sent"))
      .catch((err) => console.error("Backend not reachable", err));
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/allVideo")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const setSideNavbarfunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <div className="App">
      <Navbar setSideNavbarfunc={setSideNavbarfunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
