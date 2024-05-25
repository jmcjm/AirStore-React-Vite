import React, { useState, useEffect } from 'react';

interface LandingPageProduct {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  function LandingPageProductList() {
    const [products, setProducts] = useState<LandingPageProduct[]>([]); // Określ typ danych jako tablicę produktów
  
    useEffect(() => {
      fetch('https://example.com/api/landingpageproducts')
        .then(response => response.json())
        .then((data: LandingPageProduct[]) => setProducts(data)) // Użyj typu Product do odpowiedniego typowania danych
        .catch(error => console.error('Error fetching products:', error));
    }, []);
  
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <div key={product.id} className='product-box rounded text-light d-flex align-items-center justify-content-center'>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </ul>
      </div>
    );
  }
  
  export default LandingPageProductList;
  
