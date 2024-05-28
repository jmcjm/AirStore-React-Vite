import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import AirPhoneProductList from "./AirPhoneAPI";
import AirPhonePNG from "../assets/airphone.png";
import "../index.css";

function AirPhone() {
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
      className={`bg-image text-light d-flex ${
        isMobile ? "flex-column" : "flex-row-reverse"
      }`}
      style={{
        backgroundImage: "linear-gradient(90deg, #7d7d7d, #060606, black)",
        height: `${availableHeight}px`,
        position: "fixed",
        width: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-image container-fluid text-light d-flex flex-column main-banner align-items-center airphone-banner flex-shrink-1"
        style={{
          backgroundImage: `url(${AirPhonePNG})`,
          backgroundSize: "cover",
          height: "auto",
        }}
      >
        <p className="header-text">AirPhone</p>
        <div>
          <p>Innovation in your pocket</p>
        </div>
      </div>
      <div className="col-12 col-md-8 d-flex align-items-center">
        <AirPhoneProductList />
      </div>
    </div>
  );
}

export default AirPhone;
