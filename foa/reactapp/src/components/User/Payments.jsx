// import React from "react";
// import { Box, Typography, Button } from "@mui/material";

// const Payments = () => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const handlePay = () => {
//     alert(`Payment successful! Total: ₹${cart.reduce((sum, f) => sum + f.price, 0)}`);
//     localStorage.removeItem("cart");
//   };

//   return (
//     <Box padding={3}>
//       <Typography variant="h4" mb={3}>Payments</Typography>
//       {cart.length === 0 ? (
//         <Typography>No items in cart.</Typography>
//       ) : (
//         <>
//           <Typography>Total: ₹{cart.reduce((sum, f) => sum + f.price, 0)}</Typography>
//           <Button variant="contained" sx={{ mt: 2 }} onClick={handlePay}>Pay Now</Button>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Payments;
import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";

const Payments = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const handlePay = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Save current cart items into "orders"
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = [...existingOrders, ...cart];
    localStorage.setItem("orders", JSON.stringify(newOrders));

    // Clear cart after payment
    localStorage.removeItem("cart");

    alert(`Payment successful! Total: ₹${cart.reduce((sum, f) => sum + f.price, 0)}`);
    //window.location.href = "/myorders"; // Redirect to MyOrders page
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" mb={3}>Payments</Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
          {cart.map((item, index) => (
            <Card key={index} sx={{ display: "flex", mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                <Typography variant="subtitle1">₹{item.price}</Typography>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h6" mt={2}>
            Total: ₹{cart.reduce((sum, f) => sum + f.price, 0)}
          </Typography>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePay}>
            Pay Now
          </Button>
        </>
      )}
    </Box>
  );
};

export default Payments;
