import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import api from "../../services/api";

const HotelAdminHome = () => {
  const [orders, setOrders] = useState([]);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const adminId = localStorage.getItem("userId"); // adminId = restaurantId
        const res = await api.get(`/hotel/orders?adminId=${adminId}`);
        setOrders(res.data);

        // Calculate total profit
        const totalProfit = res.data.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        setProfit(totalProfit);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Hotel Admin Dashboard
      </Typography>
      <Typography variant="h6" mb={2}>
        Total Profit: ₹{profit.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        Total Orders: {orders.length}
      </Typography>
    </Box>
  );
};

export default HotelAdminHome;
