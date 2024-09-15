import React from "react";
import { useNavigate } from "react-router-dom";

import "./landing.scss";
import logoImg from "../../assets/images/Frame.png";

// Define a functional component
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fitfox-landing">
      <div>
        <img src={logoImg} alt="FitFox logo" />
        <div>
          <h1>
            Welcome to <span>Fitfox</span>!
          </h1>
          <p>
            Your main tasks are to eat healthy and stay active, improving bit by
            bit every day. We will be here to support and teach you how to live
            well and reduce the chances of metabolic diseases. You’ll earn
            points for a future airdrop.
          </p>
        </div>
      </div>
      <button className="fitfox-btn" onClick={() => navigate('/')}>Get Started!</button>
    </div>
  );
};

export default LandingPage;
