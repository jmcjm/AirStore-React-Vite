//tbh only api conn needs to be done here
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import { Row, Col, Button, Container } from "react-bootstrap/";

interface LandingPageProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

const LandingPageProductList: React.FC = () => {
  // Don't have access to api rn
  const [products, setProducts] = useState<LandingPageProduct[]>([
    {
      id: 69,
      name: "AirPhone 10 Pro",
      price: 1099,
      image:
        "https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png",
    },
    {
      id: 122,
      name: "AirWatch 5 Ultra",
      price: 549,
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MT5J3ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-alpine-ultra2_VW_34FR?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1694507270905",
    },
    {
      id: 123,
      name: "AirTab 7 Pro Create",
      price: 1399,
      image:
        "https://m.media-amazon.com/images/I/61nZdcoHjOL._AC_UF894,1000_QL80_.jpg",
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
      style={{width:"auto", backgroundColor: "rgba(41, 41, 41, 0.699)"}}
    >
      {products.map((product) => (
        <div className={`product-box rounded text-dark d-flex flex-column justify-content-around ${
          isMobile ? "product-box-mobile" : ""
        }`}>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{height:"150px"}}
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
                style={{width:"100%"}}
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
};

export default LandingPageProductList;
