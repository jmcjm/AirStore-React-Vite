import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import LandingPageProductList from "./LandingPageAPI";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap/";
import "../index.css";

function LandingPage() {
  const { availableHeight } = useContext(NavbarContext);
  const [isMobileShort, setIsMobileShort] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileShort(window.innerHeight < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container
      fluid
      className="bg-image"
      style={{
        backgroundImage: "url('https://www.roadtovr.com/wp-content/uploads/2021/05/spectacles-ar-glasses-2.jpg')",
        //height: `40vh`, //musi tu byc cokolwiek bo inaczej wysokosci na Row nie dzialaja na %, i tak minHeight to nadpisuje
        minHeight: `${availableHeight}px`, //there is sitll a problem with screens smaller then 500px verically, but dunno how to fix it rn
        //position: "fixed",
        backgroundPosition: "center",
        width: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
      }}
    >
        <Row className="text-light flex-column"  
        style={{ 
          height: "45vh", 
          ...(isMobileShort && { height: "75%" })
        }}>
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <div className="header-text">AIRGLASS</div>
                <div className="motto-text">The same world, but in a different way</div>
                <Button variant="outline-light" style={{width:"auto", marginBottom:"10px"}}>
                    <Link to="/airglass" className="nav-link">
                        Check now
                    </Link>
                </Button>
            </Col>
        </Row>
        <Row className="text-light flex-column justify-content-center" style={{minHeight:"45vh"}}>
            <LandingPageProductList />
        </Row>
    </Container>
  );
}

export default LandingPage;