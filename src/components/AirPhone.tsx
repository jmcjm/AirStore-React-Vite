import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import AirPhoneProductList from "./AirPhoneAPI";
import AirPhonePNG from "../assets/airphone.png";
import "../index.css";

function AirPhone() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);

  //Dynamiczne przypisywanie klas Bootstrapa
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
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
        position: "sticky",
        width: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
      }}
    >
      <div
        className={`bg-image container-fluid text-light d-flex flex-column main-banner align-items-center airphone-banner ${
          isMobile ? "" : "col-5"
        }`}
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
      <div className={`d-flex ${
          isMobile ? "align-items-center" : "col-7 align-items-start"
        }`}
        >
        <AirPhoneProductList />
      </div>
    </div>
  );
}

export default AirPhone;
