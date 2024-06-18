import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Row, Col, Button, Container } from "react-bootstrap/";
import { fetchProductsByType, fetchImagesByType } from "./ApiConn";

interface AirProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

function AirGlassList() {
  const initialProducts: AirProduct[] = [];
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);
  const [isMobileSuperThin, setIsMobileSuperThin] = useState(
    window.innerWidth < 450
  );
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [products, setProducts] = useState<AirProduct[]>(initialProducts);

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

  const handleAddToCart = (product: AirProduct) => {
    addToCart(product.id);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600);
  };

  useEffect(() => {
    const updateProductsWithImages = async () => {
      try {
        const fetchedProducts = await fetchProductsByType(4);
        const fetchedImages = await fetchImagesByType(4);

        if (fetchedProducts.length > 0) {
          const productsWithImages = fetchedProducts.map((product) => {
            const productImage = fetchedImages.find(
              (image) => image.productId === product.id
            );
            return {
              ...product,
              image: productImage ? productImage.image : "",
            };
          });

          setProducts(productsWithImages);
        } else {
          setProducts(initialProducts);
        }
      } catch (error) {
        console.error("Error updating products with images:", error);
      }
    };

    updateProductsWithImages();
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
          } ${isMobileSuperThin ? "product-box-mobile-super-narrow" : ""}`}
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

export default AirGlassList;
