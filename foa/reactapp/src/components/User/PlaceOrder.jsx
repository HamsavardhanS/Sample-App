// import React, { useContext } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { CartContext } from "../Context/CartContext";
// import api from "../../services/api";

// const PlaceOrder = () => {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const userId = localStorage.getItem("userId");

//   const handlePlaceOrder = () => {
//     if (cartItems.length === 0) return alert("Cart is empty!");

//     const restaurant = cartItems[0].food.restaurant; // assuming all items same restaurant
//     const orderRequest = {
//       foodOrder: { user: { id: parseInt(userId) }, restaurant: { id: restaurant.id } },
//       orderItems: cartItems.map(item => ({
//         food: { id: item.food.id },
//         quantity: item.quantity
//       }))
//     };

//     api.post("/users/orders", orderRequest)
//       .then(() => {
//         alert("Order placed successfully!");
//         clearCart();
//       })
//       .catch(err => {
//         console.error(err);
//         alert("Failed to place order.");
//       });
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom>Cart Items</Typography>
//       {cartItems.map(item => (
//         <Typography key={item.food.id}>{item.food.name} x {item.quantity} = ₹ {item.food.price * item.quantity}</Typography>
//       ))}
//       <Button variant="contained" color="primary" onClick={handlePlaceOrder} sx={{ mt: 2 }}>
//         Place Order
//       </Button>
//     </Box>
//   );
// };

// export default PlaceOrder;
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";

const PlaceOrder = () => {
  const { cartItems, clearCart, removeFromCart } = useContext(CartContext);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    axios.post("http://localhost:8080/orders", { items: cartItems })
      .then(() => {
        alert("Order placed successfully!");
        clearCart();
      })
      .catch(() => {
        alert("Failed to place order!");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6">Cart is empty</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={`${item.name} (x${item.quantity})`}
                    secondary={`₹${item.price * item.quantity}`}
                  />
                  <Button color="error" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
