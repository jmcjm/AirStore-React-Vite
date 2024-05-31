//WiP, one big mess rn
import React from "react";
import { useCart } from "./CartContext";

const CartPage: React.FC = () => {
  const { cart, removeOneFromCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="d-flex align-items-center">
              <img src={item.image} alt={item.name} style={{ width: "50px" }} />
              <div className="mx-2">
                {item.name} - {item.price}$ x {item.quantity}
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeOneFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
