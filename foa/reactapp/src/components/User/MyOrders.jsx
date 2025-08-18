import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Box, Card, CardContent, Typography } from "@mui/material";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api.get(`/users/orders?userId=${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to fetch orders:", err));
  }, [userId]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>My Orders</Typography>
      {orders.length === 0 ? <Typography>No orders yet</Typography> : (
        orders.map(order => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>Order ID: {order.id}</Typography>
              <Typography>Status: {order.orderStatus}</Typography>
              <Typography>Total: ₹ {order.totalPrice}</Typography>
              <Typography>Items:</Typography>
              {order.items.map(item => (
                <Typography key={item.id}>- {item.food.name} x {item.quantity}</Typography>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MyOrders;
