import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Row, Col, Button, Container } from "react-bootstrap/";
import { fetchProductsByType } from "./ApiConn";
import { AirPhoneB64 } from "../assets/AirPhoneB64";

interface AirPhoneProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

function AirPhoneProductList() {
  const defaultProducts: AirPhoneProduct[] = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image: "",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image: "",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: "",
    },
    {
      id: 4,
      name: "Product 4",
      price: 39.99,
      image: "",
    },
    {
      id: 5,
      name: "Product 5",
      price: 39.99,
      image: "",
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);
  const [isMobileSuperThin, setIsMobileSuperThin] = useState(window.innerWidth < 450);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<AirPhoneProduct[]>(defaultProducts);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
      setIsMobileSuperThin(window.innerWidth < 450);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddToCart = (product: AirPhoneProduct) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600);
  };

  useEffect(() => {
    const productType = 1; // 1 - AirPhone, 2 - AirTab, 3 - AirWatch , 4 - AirGlass
    fetchProductsByType(productType).then((fetchedProducts) => {
      if (fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
    });
  }, []);

  return (
    <Container
      fluid
      className={`flex-wrap d-flex align-items-center justify-content-around`}
      style={{ maxWidth: "1000px" }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={`product-box product-box-mobile rounded text-dark d-flex flex-column justify-content-around ${
            isMobile ? "product-box-mobile-narrow" : ""
          } ${
            isMobileSuperThin ? "product-box-mobile-super-narrow" : ""
          }`}
        >
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <img
                src={`data:image/jpeg;base64,${AirPhoneB64}`} // src={product.image} waiting on API images implementation
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
                {addedToCart === product.id ? "Added!" : "Add to cart"}
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default AirPhoneProductList;
