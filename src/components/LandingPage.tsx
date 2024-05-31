//looking good for now?
import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import LandingPageProductList from "./LandingPageAPI";
import { Link } from "react-router-dom";
import "../index.css";

function LandingPage() {
  const { availableHeight } = useContext(NavbarContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="landing-page-wrapper"
      style={{
        minHeight: "550px",
        height: `${availableHeight}px`,
        width: "100%",
      }}
    >
      <div
        className="text-light"
        style={{
          minHeight: "550px",
          height: `${availableHeight}px`,
          width: "100%",
        }}
      >
        <div className="container-fluid text-light d-flex flex-column align-items-center justify-content-center main-banner flex-shrink-1 col-12 col-md-4">
          <p className="header-text">AIRGLASS</p>
          <p className="motto-text">The same world, but in a different way</p>
          <div>
            <button type="button" className="btn btn-outline-light">
              <Link to="/airglass" className="nav-link">
                Check now
              </Link>
            </button>
          </div>
        </div>
        <LandingPageProductList />
      </div>
    </div>
  );
}

export default LandingPage;