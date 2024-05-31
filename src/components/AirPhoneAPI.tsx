import React, { useState, useEffect, useRef } from "react";
import { useCart } from "./BasketContext";

interface AirPhoneProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

const AirPhoneProductList: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [products, setProducts] = useState<AirPhoneProduct[]>([
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

  const [isOverflow, setIsOverflow] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const adsBannerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    function handleResize() {
      if (adsBannerRef.current) {
        const adsBannerHeight = adsBannerRef.current.clientHeight;
        const containerHeight = adsBannerRef.current.scrollHeight;
        setIsOverflow(containerHeight > adsBannerHeight);
      }
      setIsMobile(window.innerWidth < 1000);
    }

    handleResize(); // Wywołaj raz na początku

    window.addEventListener("resize", handleResize); // Nasłuchuj zmiany rozmiaru okna

    // Czyszczenie nasłuchiwania zdarzeń po odmontowaniu komponentu
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = (product: AirPhoneProduct) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600); // Reset after 2 seconds
  };

  return (
    <div>
      <div
        ref={adsBannerRef}
        className={`container-md flex-wrap d-flex align-items-center justify-content-around flex-grow-3 ${
          isOverflow ? "overflow" : ""
        }`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-box product-box-airphone text-dark rounded d-flex align-items-center flex-wrap flex-column justify-content-center ${
              isMobile ? "product-box-mobile" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="productName">{product.name}</span>
              <span className="productPrice">{product.price}$</span>
            </div>
            <button
              type="button"
              className={`btn btn-dark ${
                addedToCart === product.id ? "added-to-cart" : ""
              }`}
              onClick={() => handleAddToCart(product)}
            >
              {addedToCart === product.id ? "Added!" : "Add to basket"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirPhoneProductList;
