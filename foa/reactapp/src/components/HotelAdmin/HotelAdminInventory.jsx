import React, { useEffect, useState } from "react";
import api from "../../services/api"; // make sure this points to your axios instance
import { Box, Typography } from "@mui/material";
import FoodCard from "../FoodCard"; // your existing FoodCard component

const HotelAdminInventory = () => {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const adminId = localStorage.getItem("userId"); // adminId = restaurantId
      const res = await api.get(`/hotel/foods?adminId=${adminId}`);
      setFoods(res.data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await api.delete(`/hotel/foods/${foodId}`);
      setFoods((prevFoods) => prevFoods.filter((f) => f.id !== foodId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      {foods.length === 0 ? (
        <Typography>No foods yet.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onDelete={() => handleDelete(food.id)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HotelAdminInventory;
