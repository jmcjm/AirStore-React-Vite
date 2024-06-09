//broken as f at certain screen ratios (width below 1000px), AirTab is looking better in those situations
import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import AirPhoneProductList from "./AirPhoneAPI";
const AirPhonePNG = "https://rybka.ct8.pl/airphone.jpg"; //tymczasowy fix
import "../index.css";

function AirPhone() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const backgroundImage = isMobile
  ? "linear-gradient(0deg, #696969, #060606, black)"
  : "linear-gradient(90deg, #7d7d7d, #060606, black)";

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
        backgroundImage: backgroundImage,
        minHeight: `${availableHeight}px`,
        position: "sticky",
        width: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
      }}
    >
      <div
        className={`bg-image container-fluid text-light d-flex flex-column main-banner align-items-center airphone-banner ${
          isMobile ? "vh-100" : "col-5"
        }`}
        style={{
          backgroundImage: `url(${AirPhonePNG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "auto",
        }}
      >
        <p className="header-text">AirPhone</p>
        <div>
          <p>Innovation in your pocket</p>
        </div>
      </div>
      <div
        className={`d-flex ${
          isMobile ? "align-items-center" : "col-7 align-items-start"
        }`}
      >
        <AirPhoneProductList />
      </div>
    </div>
  );
}

export default AirPhone;
