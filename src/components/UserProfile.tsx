import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../NavbarContext";
import AirPhoneProductList from "./AirPhoneAPI";
const AirPhonePNG = "https://rybka.ct8.pl/airphone.jpg"; //tymczasowy fix
import "../index.css";
import { Container, Row, Col, Stack } from "react-bootstrap";

function UserProfile() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);
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
    <Container fluid>
        <Container>
            <Row>
                <Col>
                    <span>Your profile</span>
                </Col>
            </Row>
            <Col>
                <Row>
                    <Col>
                        <span>Name:</span>
                    </Col>
                    <Col>
                        <span>user.firstName + user.lastName</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span>Email:</span>
                    </Col>
                    <Col>
                        <span>user.email</span>
                    </Col>
                </Row>
                <Stack>
                    <div className="mainStack">Name:</div>
                    <div className="secondStack">user.firstName + user.lastName</div>
                </Stack>
            </Col>
        </Container>
    </Container>
  );
}

export default UserProfile;