import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Row, Col, Button, Container } from "react-bootstrap/";
import { fetchProductByID } from "./ApiConn";
import { AirTabB64 } from "../assets/AirTabB64";
import { AirPhoneB64 } from "../assets/AirPhoneB64";
import { AirWatchB64 } from "../assets/AirWatchB64";
import "../index.css";

interface LandingPageProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

const LandingPageProductList: React.FC = () => {
  const localImages = new Map<number, string>([
    [5, AirPhoneB64],
    [7, AirWatchB64],
    [9, AirTabB64],
  ]);

  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);
  const [products, setProducts] = useState<LandingPageProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const productIds = [5, 7, 9];
      const productPromises = productIds.map((id) => fetchProductByID(id));
      const fetchedProducts = await Promise.all(productPromises);
      const updatedProducts = fetchedProducts
        .filter((product) => product !== null) // Remove null values
        .map((product) => {
          const localImage = localImages.get(product!.id);
          const updatedProduct = {
            ...product!,
            image: localImage || product!.image, // Replace image if local
          };
          console.log("Updated Product:", updatedProduct); // Debug log
          return updatedProduct;
        });
      setProducts(updatedProducts as LandingPageProduct[]);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddToCart = (product: LandingPageProduct) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600);
  };

  return (
    <Container
      className={`flex-wrap rounded d-flex justify-content-around ads-banner ${
        isMobile ? "align-items-end" : "align-items-center"
      }`}
      style={{ width: "auto", backgroundColor: "rgba(41, 41, 41, 0.699)" }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={`product-box rounded text-dark d-flex flex-column justify-content-around ${
            isMobile ? "product-box-mobile" : ""
          }`}
        >
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
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
                style={{ width: "100%" }}
                className={` ${
                  addedToCart === product.id ? "added-to-cart" : ""
                }`}
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
};

export default LandingPageProductList;
