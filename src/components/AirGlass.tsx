//WiP
import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

function AirGlass() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);

  return (
    <div
      className="container-fluid bg-image text-light"
      style={{
        backgroundImage: `url('https://rybka.ct8.pl/1/012.jpg')`,
        height: availableHeight - 1,
      }}
    >
      <p>Wysokość navbara: {navbarHeight}px</p>
      <p>Dostępna wysokość: {availableHeight}px</p>
      <p>AirGlass</p>
    </div>
  );
}

export default AirGlass;
