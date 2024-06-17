import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import LandingPageProductList from "./LandingPageAPI";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap/";
import "../index.css";

function LandingPage() {
  const { availableHeight, navbarHeight } = useContext(NavbarContext);

  return (
    <Container
      fluid
      style={{ minHeight: `${availableHeight}px` }}
    >
      <Container fluid
        style={{
          backgroundImage: "url('https://www.roadtovr.com/wp-content/uploads/2021/05/spectacles-ar-glasses-2.jpg')",
          minHeight: `100vh`,
          backgroundPosition: "center",
          width: "102vw",
          marginLeft: "-15px", // hack around, dunno why it have the margins
          marginTop: `-${navbarHeight}px`,
          overflowY: "hidden",
          zIndex: "-1",
          position: "fixed",
          backgroundSize: "cover",
        }}
      />
      <Row className="text-light flex-column"  
      style={{ height: "45vh", minHeight:"240px" }}>
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