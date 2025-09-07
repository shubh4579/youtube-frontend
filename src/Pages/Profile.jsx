import Sidenavbar from "../Components/Sidenavbar";
import "./profile.css";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile({ sideNavbar }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const fetchProfileData = async () => {
    axios
      .get(`https://youtube-backend-9m2f.onrender.com/api/${id}/channel`)
      .then((response) => {
        setData(response.data.video);
        setUser(response.data.video[0]?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="profile">
      <Sidenavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={user?.profilePic}
              alt="Profile"
            />
          </div>

          <div className="profile_top_section_About">
            <div className="profile_top_section_About_Name">
              {user?.channelName}
            </div>
            <div className="profile_top_section_info">
              {user?.userName} . {data.length} Videos
            </div>
            <div className="profile_top_section_info">{user?.about}</div>
          </div>
        </div>
        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos &nbsp; <FaAngleRight />
          </div>
          <div className="profileVideos">
            {data.map((item, key) => {
              return (
                <Link to={`/watch/${item._id}`} className="profileVideo_block">
                  <div className="profileVideo_block_thumbnail">
                    <img
                      className="profileVideo_block_thumbnail_img"
                      src={item?.thumbnail}
                      alt=""
                    />
                  </div>

                  <div className="profileVideo_block_detail">
                    <div className="profileVideo_block_detail_name">
                      {item?.title}
                    </div>

                    <div className="profileVideo_block_detail_about">
                      Create at {item?.createdAt.slice(0, 10)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
