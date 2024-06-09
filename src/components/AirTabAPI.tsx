import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Row, Col, Button, Container } from "react-bootstrap/";

interface AirTabProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

function AirTabProductList() {
  const [products, setProducts] = useState<AirTabProduct[]>([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image:
        "https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image:
        "https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image:
        "https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png",
    },
    {
      id: 4,
      name: "Product 4",
      price: 39.99,
      image:
        "https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png",
    },
    {
      id: 5,
      name: "Product 5",
      price: 39.99,
      image:
        "https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png",
    },
  ]);

  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddToCart = (product: AirTabProduct) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600);
  };

  return (
    <Container
      className={`container-md flex-wrap d-flex align-items-center justify-content-around flex-grow-3`}
    >
      {products.map((product) => (
        <div
          className={`product-box rounded text-dark d-flex flex-column justify-content-around ${
            isMobile ? "product-box-mobile" : ""
          }`}
        >
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{ height: "150px" }}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Button
                variant="dark"
                className={`${
                  addedToCart === product.id ? "added-to-cart" : ""
                }`}
                style={{ width: "100%" }}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default AirTabProductList;
