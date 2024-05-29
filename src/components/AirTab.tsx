import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import AirTabProductList from "./AirTabAPI";
import AirPhonePNG from "../assets/airphone.png";
import "../index.css";

function AirTab() {
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
        <p className="header-text">AirTab</p>
        <div>
          <p>Creativity for everyone</p>
        </div>
      </div>
      <AirTabProductList />
    </div>
  );
}

export default AirTab;
