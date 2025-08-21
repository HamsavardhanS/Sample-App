// import React, { useEffect, useState } from "react";
// import api from "../../services/api";
// import { Box, Card, CardContent, Typography } from "@mui/material";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     api.get(`/users/orders?userId=${userId}`)
//       .then(res => setOrders(res.data))
//       .catch(err => console.error("Failed to fetch orders:", err));
//   }, [userId]);

//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom>My Orders</Typography>
//       {orders.length === 0 ? <Typography>No orders yet</Typography> : (
//         orders.map(order => (
//           <Card key={order.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography>Order ID: {order.id}</Typography>
//               <Typography>Status: {order.orderStatus}</Typography>
//               <Typography>Total: ₹ {order.totalPrice}</Typography>
//               <Typography>Items:</Typography>
//               {order.items.map(item => (
//                 <Typography key={item.id}>- {item.food.name} x {item.quantity}</Typography>
//               ))}
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </Box>
//   );
// };

// export default MyOrders;
import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const MyOrders = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <Box padding={3}>
      <Typography variant="h4" mb={3}>My Orders</Typography>

      {orders.length === 0 ? (
        <Typography>No orders placed yet.</Typography>
      ) : (
        orders.map((item, index) => (
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
        ))
      )}
    </Box>
  );
};

export default MyOrders;
