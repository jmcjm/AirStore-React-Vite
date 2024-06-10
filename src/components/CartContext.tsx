import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface AirProducts {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: AirProducts[];
  addToCart: (product: AirProducts) => void;
  removeFromCart: (productId: number) => void;
  removeOneFromCart: (productId: number) => void;
  saveCart: () => void;
  loadCart: () => void;
  getTotalCost: () => number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<AirProducts[]>([]);

  const addToCart = (product: AirProducts) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
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
      if (product && product.quantity && product.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity! - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  // Function to save cart to cookies
  const saveCart = () => {
    try {
      Cookies.set("cart", JSON.stringify(cart), {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      console.log("Cart saved to cookies:", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to cookies:", error);
    }
  };

  // Function to load cart from cookies
  const loadCart = () => {
    try {
      const cartFromCookies = Cookies.get("cart");
      if (cartFromCookies) {
        setCart(JSON.parse(cartFromCookies));
        console.log("Cart loaded from cookies:", JSON.parse(cartFromCookies));
      } else {
        console.log("No cart found in cookies");
      }
    } catch (error) {
      console.error("Error loading cart from cookies:", error);
    }
  };

  // Function to get total cost of cart
  const getTotalCost = () => {
    const totalCost = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return parseFloat(totalCost.toFixed(2));
  };

  useEffect(() => {
    // Load cart from cookies when component mounts
    loadCart();
  }, []);

  useEffect(() => {
    // Save cart to cookies whenever it changes
    saveCart();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
        saveCart,
        loadCart,
        getTotalCost,
      }}
    >
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
