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

const defaultProducts: LandingPageProduct[] = [
  {
    id: 5,
    name: "AirPhone 10 Pro",
    price: 1099,
    image: AirPhoneB64,
  },
  {
    id: 7,
    name: "AirWatch 5 Ultra",
    price: 549,
    image: AirWatchB64,
  },
  {
    id: 9,
    name: "AirTab 7 Pro Create",
    price: 1399,
    image: AirTabB64,
  },
];

const LandingPageProductList: React.FC = () => {
  const localImages = new Map<number, string>([
    [5, AirPhoneB64],
    [7, AirWatchB64],
    [9, AirTabB64],
  ]);

  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);
  const [products, setProducts] =
    useState<LandingPageProduct[]>(defaultProducts);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productIds = [5, 7, 9];
        const productPromises = productIds.map((id) => fetchProductByID(id));
        const fetchedProducts = await Promise.all(productPromises);

        if (fetchedProducts.some((product) => product)) {
          const updatedProducts = fetchedProducts
            .filter((product) => product !== null) // Remove null values
            .map((product) => {
              const localImage = localImages.get(product!.id);
              return {
                ...product!,
                image: localImage || product!.image, // Replace image if local
              };
            });
          setProducts(updatedProducts as LandingPageProduct[]);
        } else {
          setProducts(defaultProducts); // Use default products if none fetched
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(defaultProducts); // Use default products on error
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
