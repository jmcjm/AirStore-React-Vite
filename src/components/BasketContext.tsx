//RN the basket is not kept in cookies or in any other way so after page reload it's context is gone, that's something to do in the future.
//after connecting to the API and logging in the user, it would be useful to have a function that saves the user's basket data on the server side, in Postgres?
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AirPhoneProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number; // Add optional quantity field
}

interface CartContextType {
  cart: AirPhoneProduct[];
  addToCart: (product: AirPhoneProduct) => void;
  removeFromCart: (productId: number) => void;
  removeOneFromCart: (productId: number) => void; // New function
}

interface CartProviderProps {
  children: ReactNode; // Typ dla children
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<AirPhoneProduct[]>([]);

  const addToCart = (product: AirPhoneProduct) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const removeOneFromCart = (productId: number) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === productId);
      if (product) {
        if (product.quantity && product.quantity > 1) {
          return prevCart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity! - 1 } : item
          );
        } else {
          return prevCart.filter((item) => item.id !== productId);
        }
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeOneFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
