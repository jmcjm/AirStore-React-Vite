import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import AirPhoneProductList from "./AirPhoneAPI";
import AirPhonePNG from "../assets/airphone.png";
import "../index.css";

function AirPhone() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);

  return (
    <div
      className="bg-image text-light flex-row-reverse d-flex"
      style={{
        backgroundImage: "linear-gradient(90deg, #7d7d7d, #060606, black)",
        height: `calc(100vh - ${navbarHeight}px - 0px)`,
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
      <AirPhoneProductList />
    </div>
  );
}

export default AirPhone;
