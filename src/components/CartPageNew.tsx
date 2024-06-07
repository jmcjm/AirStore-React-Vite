import { Row, Col, Button, Container, Stack } from 'react-bootstrap/';
import React, { useContext } from "react";
import { useCart } from "./CartContext";
import { NavbarContext } from "../NavbarContext";
import "../index.css";

const CartPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, removeOneFromCart } = useCart();
  const { availableHeight } = useContext(NavbarContext);

  return (
    <Container fluid="xl" className='bg-image'
    style={{
        backgroundColor: "rgb(25 28 30)",
        minHeight: `${availableHeight}px`,
        position: "sticky",
        width: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
      }}
    >
      <Row><Col className="d-flex justify-content-center align-items-center text-light"><h2>Your cart:</h2></Col></Row>
      <Row>
        <Col xs={7}>
          {cart.map((item, index) => (
            <div key={index} className="d-flex CartProductBox">
              <Col xs={3} className="d-flex justify-content-center align-items-center">
                <img src={item.image} alt={item.name} style={{ maxWidth: "70%", maxHeight: "100%" }} />
              </Col>
              <Col xs={6} className="d-flex justify-content-space-between flex-column">
                <Row>
                  <span className="ProductName">{item.name}</span>
                </Row>
                <Row>
                  <span>{item.price} $</span>
                </Row>
                <Row className='bottomRow'>
                    <Stack direction="horizontal" gap={0}>
                        <Button
                            variant="light"
                            className="btn p-1"
                            onClick={() => removeOneFromCart(item.id)}
                            disabled={item.quantity === 1}
                        >
                            -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                            variant="light"
                            className="btn p-1"
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
                  className="btn p-1"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </Button>
              </Col>
            </div>
          ))}
        </Col>
        <Col className='text-light'>HUJ XD</Col>
      </Row>
    </Container>
  );
}

export default CartPage;
