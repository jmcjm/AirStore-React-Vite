import { Row, Col, Button, Container, Stack, Modal, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { useCart } from "./CartContext";
import { NavbarContext } from "../NavbarContext";
import { fetchProductByID, AirProducts } from "./ApiConn"; // Import the fetch function and type
import "../index.css";

const CartPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, removeOneFromCart } = useCart();
  const { availableHeight } = useContext(NavbarContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [products, setProducts] = useState<(AirProducts & { quantity: number })[]>([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = await Promise.all(
        cart.map(async (item) => {
          const product = await fetchProductByID(item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
      );
      const validProducts = productDetails.filter(
        (product) => product !== null
      ) as (AirProducts & { quantity: number })[];
      setProducts(validProducts);
    };

    fetchProducts();
  }, [cart]);

  const getTotalCost = () => {
    const totalCost = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return parseFloat(totalCost.toFixed(2));
  };

  // Function to handle max length for card number and CVV
  const handleMaxLength = (e: ChangeEvent<HTMLInputElement>, maxLength: number) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

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
          {products.length !== 0 && (
            <>
              <Col xs={isMobile ? 15 : 7}>
                {products.map((item, index) => (
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
                            onClick={() => addToCart(item.id)}
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
              {isMobile && (
                <Col
                  xs={15}
                  style={{ marginTop: "-10px", marginBottom: "-15px" }}
                >
                  <hr
                    className="rounded"
                    style={{ borderWidth: "7px", color: "white" }}
                  />
                </Col>
              )}
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
                <Button className="checkoutButton" variant="light" onClick={() => setShowModal(true)}>
                  Checkout
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Container>

      {/* Modal for Checkout */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select aria-label="Select country from list" required>
                  <option value="">Select a country...</option>
                  <option value="Austria">Austria</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Greece">Greece</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Italy">Italy</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Malta">Malta</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Norway">Norway</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Romania">Romania</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Spain">Spain</option>
                  <option value="Sweden">Sweden</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city name" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter postal code" required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" placeholder="Enter street name" required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBuildingNumber">
                <Form.Label>Building Number</Form.Label>
                <Form.Control type="text" placeholder="Enter building number" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridApartmentNumber">
                <Form.Label>Apartment Number</Form.Label>
                <Form.Control type="text" placeholder="Enter apartment number (optional)" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter card number" 
                  inputMode="numeric" 
                  pattern="\d*" 
                  maxLength={16} 
                  onInput={(e: ChangeEvent<HTMLInputElement>) => handleMaxLength(e, 16)}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridExpiration">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="MM/YY" 
                  pattern="\d{2}/\d{2}" 
                  maxLength={5} 
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="CVV" 
                  inputMode="numeric" 
                  pattern="\d*" 
                  maxLength={3} 
                  onInput={(e: ChangeEvent<HTMLInputElement>) => handleMaxLength(e, 4)}
                  required
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
