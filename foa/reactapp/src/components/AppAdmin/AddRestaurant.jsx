import React, { useState } from "react";
import { addRestaurant } from "../../services/adminapi";
import { TextField, Button, Paper, Typography } from "@mui/material";

const AddRestaurant = ({ onRestaurantAdded }) => {
  const [restaurant, setRestaurant] = useState({ name: "", location: "", imageUrl: "" });
  const [hotelAdminId, setHotelAdminId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurant.name || !restaurant.location || !restaurant.imageUrl || !hotelAdminId) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await addRestaurant(restaurant, hotelAdminId);
      alert("Restaurant added successfully");
      setRestaurant({ name: "", location: "", imageUrl: "" });
      setHotelAdminId("");
      if (onRestaurantAdded) onRestaurantAdded(res.data); // optional callback to refresh list
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Invalid hotel admin ID or server error");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
        Add Restaurant
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={restaurant.name}
          onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          value={restaurant.location}
          onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          value={restaurant.imageUrl}
          onChange={(e) => setRestaurant({ ...restaurant, imageUrl: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Hotel Admin ID"
          value={hotelAdminId}
          onChange={(e) => setHotelAdminId(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.2 }}>
          Add Restaurant
        </Button>
      </form>
    </Paper>
  );
};

export default AddRestaurant;
