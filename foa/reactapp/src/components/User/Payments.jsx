import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Payments = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const handlePay = () => {
    alert(`Payment successful! Total: ₹${cart.reduce((sum, f) => sum + f.price, 0)}`);
    localStorage.removeItem("cart");
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" mb={3}>Payments</Typography>
      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
          <Typography>Total: ₹{cart.reduce((sum, f) => sum + f.price, 0)}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePay}>Pay Now</Button>
        </>
      )}
    </Box>
  );
};

export default Payments;
