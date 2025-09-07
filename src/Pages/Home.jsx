import HomePage from "../Components/HomePage";
import Sidenavbar from "../Components/Sidenavbar";
import "./home.css";

function Home({ sideNavbar }) {
  return (
    <div className="home">
      <Sidenavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
    </div>
  );
}
export default Home;
