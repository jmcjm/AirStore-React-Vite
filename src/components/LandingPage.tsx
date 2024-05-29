import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import LandingPageProductList from "./LandingPageAPI";
import { Link } from "react-router-dom";
import "../index.css";

function LandingPage() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);
  //Dynamiczne przypisywanie klas Bootstrapa
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
      className="bg-image text-light"
      style={{
        backgroundImage: `url('https://www.roadtovr.com/wp-content/uploads/2021/05/spectacles-ar-glasses-2.jpg')`,
        minHeight: "550px",
        height: `${availableHeight}px`,
        position: "fixed",
        width: "100%",
        //overflowY: "auto",
        backgroundSize: "cover",
        backgroundPositionX: "center",
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
  );
}

export default LandingPage;
