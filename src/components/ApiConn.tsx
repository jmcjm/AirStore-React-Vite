import React, { useState, useEffect, useRef } from "react";

interface LandingPageProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

function LandingPageProductList() {
  // Don't have access to api rn
  const [products, setProducts] = useState<LandingPageProduct[]>([
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
  ]);

  const [isOverflow, setIsOverflow] = useState(false);
  const adsBannerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className={`container-md flex-wrap rounded d-flex align-items-center justify-content-around ads-banner ${
        isOverflow ? "overflow" : ""
      }`}
      ref={adsBannerRef}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="product-box text-dark rounded d-flex align-items-center flex-wrap flex-column justify-content-center"
        >
          <img src={product.image} alt={product.name} />
          <div className="d-flex align-items-center justify-content-between">
            <span className="productName">{product.name}</span>
            <span className="productPrice">{product.price}$</span>
          </div>
          <button type="button" className="btn btn-dark">
            Add to basket
          </button>
        </div>
      ))}
    </div>
  );
}

export default LandingPageProductList;
