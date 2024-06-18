import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Row, Col, Button, Container } from "react-bootstrap/";
import { fetchProductByID, fetchImageByID } from "./ApiConn";
import "../index.css";

interface LandingPageProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

const LandingPageProductList: React.FC = () => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);
  const [products, setProducts] = useState<LandingPageProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productIds = [5, 13, 9];

        const fetchProducts = async () => {
          const productDetails = await Promise.all(
            productIds.map(async (item) => {
              const product = await fetchProductByID(item);
              if (product) {
                const image = await fetchImageByID(item);
                return {
                  ...product,
                  image: image?.image, // Use the fetched image if available
                };
              }
              return null;
            })
          );
          const validProducts = productDetails.filter(
            (product) => product !== null
          ) as LandingPageProduct[];
          setProducts(validProducts);
        };
        fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
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
    addToCart(product.id);
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
