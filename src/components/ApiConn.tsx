import React, { useState, useEffect } from 'react';

interface LandingPageProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}

function LandingPageProductList() {
    //const [products, setProducts] = useState<LandingPageProduct[]>([]); // Określ typ danych jako tablicę produktów

    //useEffect(() => {
    //    fetch('https://example.com/api/landingpageproducts')
    //    .then(response => response.json())
    //    .then((data: LandingPageProduct[]) => setProducts(data)) // Użyj typu Product do odpowiedniego typowania danych
    //    .catch(error => console.error('Error fetching products:', error));
    //}, []
    // Don't have access to api rn
    const [products, setProducts] = useState<LandingPageProduct[]>([
        {
          id: 1,
          name: 'Product 1',
          price: 19.99,
          image: 'https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png',
        },
        {
          id: 2,
          name: 'Product 2',
          price: 29.99,
          image: 'https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png',
        },
        {
          id: 3,
          name: 'Product 3',
          price: 39.99,
          image: 'https://www.tescomobile.com/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-2__gben.png',
        },
    ]);

    return (
        <div className='container-md flex-wrap rounded text-light d-flex align-items-center justify-content-around ads-banner'>
            {products.map(product => (
            <div key={product.id} className='product-box rounded text-light d-flex align-items-center flex-wrap flex-column justify-content-center'>
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <img src={product.image} alt={product.name} />
            </div>
            ))}
        </div>
    );
}

export default LandingPageProductList;
  
