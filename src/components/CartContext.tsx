import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  removeOneFromCart: (productId: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!cartLoaded) {
      setCartLoaded(true);
      // Load cart from cookies when component mounts
      const savedCart = Cookies.get("cart");
      console.log("Attempting to load cart from cookies:", savedCart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log("Cart loaded from cookies:", parsedCart);
        setCart(parsedCart);
      }
    }
  }, [cartLoaded]);

  useEffect(() => {
    if (cartLoaded) {
      // Save cart to cookies whenever it changes
      console.log("Cart saved to cookies:", cart);
      Cookies.set("cart", JSON.stringify(cart), {
        expires: 7,
        sameSite: "Lax",
      });
    }
  }, [cart, cartLoaded]);

  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Product quantity updated:", updatedCart);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { id: productId, quantity: 1 }];
        console.log("Product added to cart:", newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      console.log("Product removed from cart:", updatedCart);
      return updatedCart;
    });
  };

  const removeOneFromCart = (productId: number) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        const updatedCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        console.log("Product quantity decreased:", updatedCart);
        return updatedCart;
      }
      const newCart = prevCart.filter((item) => item.id !== productId);
      console.log("Product removed from cart as quantity is 0:", newCart);
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
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
