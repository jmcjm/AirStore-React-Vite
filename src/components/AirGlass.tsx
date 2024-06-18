import { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import AirGlassList from "./AirGlassAPI";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap/";
import "../index.css";
const AirGlass = "https://rybka.ct8.pl/airglass.png";

function LandingPage() {
  const { availableHeight } = useContext(NavbarContext);

  return (
    <Container
      fluid
      className="d-flex flex-column-reverse"
      style={{
        minHeight: `${availableHeight}px`,
        backgroundImage:
          "linear-gradient(233deg, rgba(0,0,0,1) 0%, #303030 100%)",
      }}
    >
      <Row
        className="d-flex align-items-center"
        style={{
          minHeight: "240px",
          height: "45vh",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 60%, #c1c1c1 100%)",
        }}
      >
        <Container
          fluid
          className="d-flex flex-column-reverse"
          style={{
            height: "100%",
            width: "50%",
            backgroundImage: `url('${AirGlass}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Container>
      </Row>
      <Row
        className="text-light flex-column justify-content-center"
        style={{ minHeight: "45vh" }}
      >
        <AirGlassList />
      </Row>
    </Container>
  );
}

export default LandingPage;
