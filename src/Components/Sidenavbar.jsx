import "./sidenavbar.css";

import { SiYoutubeshorts } from "react-icons/si";
import {
  MdHome,
  MdSubscriptions,
  MdHistory,
  MdPlaylistPlay,
  MdWatchLater,
  MdShoppingBag,
  MdMusicNote,
} from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { BiVideo } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

function Sidenavbar({ sideNavbar }) {
  return (
    <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
      {/* Top Section */}
      <div className="home_sideNavbarTop">
        <div className="home_sideNavbarTopOption">
          <MdHome size={30} />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <SiYoutubeshorts size={30} />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <MdSubscriptions size={30} />
          <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
        </div>
      </div>

      {/* You Section */}
      <div className="home_sideNavbarMiddle">
        <div
          className="home_sideNavbarTopOptionTitleHeader"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "8px",
          }}
        >
          You <IoIosArrowForward size={30} />
        </div>
        <div className="home_sideNavbarTopOption">
          <MdHistory size={30} />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <MdPlaylistPlay size={30} />
          <div className="home_sideNavbarTopOptionTitle">Playlists</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <BiVideo size={30} />
          <div className="home_sideNavbarTopOptionTitle">Your videos</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <MdWatchLater size={30} />
          <div className="home_sideNavbarTopOptionTitle">Watch later</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <FaRegThumbsUp size={30} />
          <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="home_sideNavbarMiddle">
        <div
          className="home_sideNavbarTopOptionTitleHeader"
          style={{ marginBottom: "8px" }}
        >
          Subscriptions
        </div>

        <div className="home_sideNavbarTopOption">
          <MdSubscriptions size={30} />
          <div className="home_sideNavbarTopOptionTitle">All subscriptions</div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="home_sideNavbarMiddle">
        <div
          className="home_sideNavbarTopOptionTitleHeader"
          style={{ marginBottom: "8px" }}
        >
          Explore
        </div>
        <div className="home_sideNavbarTopOption">
          <MdShoppingBag size={30} />
          <div className="home_sideNavbarTopOptionTitle">Shopping</div>
        </div>
        <div className="home_sideNavbarTopOption">
          <MdMusicNote size={30} />
          <div className="home_sideNavbarTopOptionTitle">Music</div>
        </div>
      </div>
    </div>
  );
}
export default Sidenavbar;
