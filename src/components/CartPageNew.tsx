import { Row, Col, Button, Container, Stack } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { NavbarContext } from "../NavbarContext";
import "../index.css";

const CartPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, removeOneFromCart, getTotalCost } =
    useCart();
  const { availableHeight } = useContext(NavbarContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
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
        backgroundColor: "rgb(25 28 30)",
        minHeight: `${availableHeight}px`,
        position: "sticky",
        width: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
      }}
    >
      <Container fluid="sm">
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-light">
            <span className="CartTitle">
              {cart.length === 0 ? "Your cart is empty" : "Your cart"}
            </span>
          </Col>
        </Row>
        <Row>
          {cart.length !== 0 && (
            <>
              <Col xs={isMobile ? 15 : 7}>
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className={`d-flex CartProductBox rounded ${
                      isMobile ? "CartProductBoxMobileFix" : ""
                    }`}
                  >
                    <Col
                      xs={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={item.name}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Col>
                    <Col
                      xs={6}
                      className="d-flex justify-content-space-between flex-column"
                    >
                      <Row>
                        <span className="ProductName">{item.name}</span>
                      </Row>
                      <Row>
                        <span>{item.price} $</span>
                      </Row>
                      <Row className="bottomRow">
                        <Stack direction="horizontal" gap={0}>
                          <Button
                            variant="light"
                            className="p-1"
                            onClick={() => removeOneFromCart(item.id)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="light"
                            className="p-1"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </Button>
                        </Stack>
                      </Row>
                    </Col>
                    <Col className="d-flex align-items-start justify-content-end">
                      <Button
                        variant="light"
                        className="p-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </Button>
                    </Col>
                  </div>
                ))}
              </Col>
              <Col>
                <div
                  className={`CartSummary rounded ${
                    isMobile ? "CartSummaryMobileFix" : ""
                  }`}
                >
                  <Row>
                    <Col>
                      <span>Order value</span>
                    </Col>
                    <Col className="text-end">
                      <span>${getTotalCost().toFixed(2)}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>Delivery</span>
                    </Col>
                    <Col className="text-end">
                      <span>$10.00</span>
                    </Col>
                  </Row>
                  <hr className="border-3" />
                  <Row className="fs-4">
                    <Col>
                      <span>Total</span>
                    </Col>
                    <Col className="text-end">
                      <span>${(getTotalCost() + 10).toFixed(2)}</span>
                    </Col>
                  </Row>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default CartPage;
