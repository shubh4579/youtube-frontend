import { Profiler, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video";
import Profile from "./Pages/Profile";
import VideoUpload from "./Pages/VideoUpload";
import SignUp from "./Pages/SignUp";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);

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
