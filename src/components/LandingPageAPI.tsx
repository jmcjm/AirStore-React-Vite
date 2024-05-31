import React, { useState, useEffect, useRef } from "react";
import { useCart } from "./BasketContext";

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

  const [isOverflow, setIsOverflow] = useState(false);
  const adsBannerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      if (adsBannerRef.current) {
        const adsBannerHeight = adsBannerRef.current.clientHeight;
        const containerHeight = adsBannerRef.current.scrollHeight;
        setIsOverflow(containerHeight > adsBannerHeight);
      }
    }

    handleResize(); // Wywołaj raz na początku

    window.addEventListener("resize", handleResize); // Nasłuchuj zmiany rozmiaru okna

    // Czyszczenie nasłuchiwania zdarzeń po odmontowaniu komponentu
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = (product: LandingPageProduct) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600); // Reset after 2 seconds
  };

  return (
    <div
      className={`container-md flex-wrap rounded d-flex justify-content-around ads-banner ${
        isOverflow ? "overflow align-items-end" : "align-items-center"
      }`}
      ref={adsBannerRef}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="product-box text-dark rounded d-flex align-items-center flex-wrap flex-column justify-content-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="d-flex align-items-center justify-content-between">
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
            Add to basket
          </button>
        </div>
      ))}
    </div>
  );
}

export default LandingPageProductList;
