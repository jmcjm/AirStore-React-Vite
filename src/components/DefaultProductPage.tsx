// All the "div"s and "p"s would need to become Containers, Rows and Cols one day
import { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import AirProductList from "./AirProductAPI";
const AirPhonePNG = "https://rybka.ct8.pl/airphone.jpg"; // Temporary fix
const AirTabPNG = "https://rybka.ct8.pl/AirTabs.jpg";
import "../index.css";

interface SiteForType {
  productType: 1 | 2;
}

function DefaultProductPage({ productType }: SiteForType) {
  const { availableHeight } = useContext(NavbarContext);
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

  const headerText = productType === 1 ? "AirPhone" : "AirTab";
  const mottoText =
    productType === 1 ? "Innovation in your pocket" : "Creativity for everyone";
  const backgroundImageURL = productType === 1 ? AirPhonePNG : AirTabPNG;

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
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "auto",
        }}
      >
        <p className="header-text">{headerText}</p>
        <div>
          <p>{mottoText}</p>
        </div>
      </div>
      <div
        className={`d-flex ${
          isMobile ? "align-items-center" : "col-7 align-items-start"
        }`}
      >
        <AirProductList productType={productType} />
      </div>
    </div>
  );
}

export default DefaultProductPage;
