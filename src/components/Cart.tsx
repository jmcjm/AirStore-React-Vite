// is it even necessary????
import React from "react";
import { useCart } from "./CartContext";

const Cart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}$
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;