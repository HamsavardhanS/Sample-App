import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CartContext } from "../Context/CartContext";
import api from "../../services/api";

const PlaceOrder = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const userId = localStorage.getItem("userId");

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");

    const restaurant = cartItems[0].food.restaurant; // assuming all items same restaurant
    const orderRequest = {
      foodOrder: { user: { id: parseInt(userId) }, restaurant: { id: restaurant.id } },
      orderItems: cartItems.map(item => ({
        food: { id: item.food.id },
        quantity: item.quantity
      }))
    };

    api.post("/users/orders", orderRequest)
      .then(() => {
        alert("Order placed successfully!");
        clearCart();
      })
      .catch(err => {
        console.error(err);
        alert("Failed to place order.");
      });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Cart Items</Typography>
      {cartItems.map(item => (
        <Typography key={item.food.id}>{item.food.name} x {item.quantity} = ₹ {item.food.price * item.quantity}</Typography>
      ))}
      <Button variant="contained" color="primary" onClick={handlePlaceOrder} sx={{ mt: 2 }}>
        Place Order
      </Button>
    </Box>
  );
};

export default PlaceOrder;
