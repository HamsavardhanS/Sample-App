import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Box, Typography, Grid, Button } from "@mui/material";

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    api.get(`/users/restaurants/${restaurantId}/foods`)
      .then(res => setFoods(res.data))
      .catch(err => console.error("Failed to fetch menu:", err));
  }, [restaurantId]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Restaurant Menu
      </Typography>
      <Grid container spacing={2}>
        {foods.map(food => (
          <Grid item key={food.id} xs={12} sm={6} md={4}>
            <Box border={1} borderRadius={2} p={2}>
              <img src={food.imageUrl} alt={food.name} width="100%" />
              <Typography variant="h6">{food.name}</Typography>
              <Typography>${food.price}</Typography>
              <Typography>{food.description}</Typography>
              <Button variant="contained" color="primary" fullWidth>
                Add to Cart
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantMenu;
