import React, { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    const existing = cartItems.find((i) => i.food.id === item.food.id);
    if (existing) {
      // update quantity
      setCartItems(
        cartItems.map((i) =>
          i.food.id === item.food.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (foodId) => {
    setCartItems(cartItems.filter((i) => i.food.id !== foodId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
