import React from "react";
import videoHomePage from "../../assets/crypto1.mp4";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";
// để lấy state của Redux
export default function HomePage(props) {
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video width="500px" height="500px" autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1 text-white">
          The World’s Fastest Growing Crypto App
        </div>
        <div className="title-2 text-black">Buy crypto at true cost</div>
        <div className="title-3">
          <button onClick={() => navigate("/register")}>
            Get's started. It's free
          </button>
        </div>
      </div>
    </div>
  );
}
